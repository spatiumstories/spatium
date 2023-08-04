import React, { useRef, useState, useEffect } from "react"
import { ReactReader } from "react-reader"
import { useParams } from "react-router";
import Button from '@mui/material/Button';
import {isMobile} from 'react-device-detect';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import Deso from 'deso-protocol';
import { useSelector, useDispatch } from "react-redux";
import { userActions } from '../../store/user-slice';
import LoginIcon from '@mui/icons-material/Login';
import { Document, Page, pdfjs } from 'react-pdf';
import {URL} from 'url';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';






const SpatiumReader = () => {
    const { book } = useParams();
    const [userKey, setUserKey] = useState(null);
    const [epubData, setEpubData] = useState(null);
    const [url, setUrl] = useState(null);
    const [isEpub, setIsEpub] = useState(true);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };

    let bookUrl = `https://api.spatiumstories.xyz/api/get-book/${book}`;
    // let bookUrl = `http://0.0.0.0:4201/api/get-book/${book}`;
    // let bookUrl = `http://spatiumtest-env.eba-wke3mfsm.us-east-1.elasticbeanstalk.com/api/get-book/${book}`

    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);
    const [size, setSize] = useState(1)
    const sizes = [80, 100, 130];
    const user = useSelector(state => state.user);
    const [page, setPage] = useState('')
    const [selections, setSelections] = useState([])
    const [location, setLocation] = useState(null)
    const renditionRef = useRef(null)
    const tocRef = useRef(null)
    const dispatch = useDispatch();
    const deso = new Deso();
    const request = 2;
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.js',
      import.meta.url,
    ).toString();

    const changeSize = () => {
        setSize((size + 1) % 3);
    }

    const nextPage = () => {
      setPageNumber((prevPage) => {
        return prevPage + 2;
      });
    }

    const previousPage = () => {
      setPageNumber((prevPage) => {
        return Math.max(0, prevPage - 2);
      });
    }

    useEffect(() => {
    // Fetch the EPUB file and convert the response to ArrayBuffer
    fetch(bookUrl)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => setEpubData(arrayBuffer))
      .catch(error => console.error('Error fetching EPUB:', error));

      console.log("Fetched Book Data");

    }, []);

    useEffect(() => {
      if (epubData !== null) {
        if (isPDF(epubData)) {
          setIsEpub(false);
        }
        convertBook();
      }
    }, [epubData]);

    const convertBook = () => {
      const pdfBlob = arrayBufferToBlob(epubData, 'application/pdf');
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);
      setUrl(pdfBlobUrl);
    }

    const arrayBufferToBlob = (arrayBuffer, type) => {
      return new Blob([arrayBuffer], { type });
    }

    const isPDF = (buffer) => {
      const magicBytes = new Uint8Array(buffer.slice(0, 4));
  
      // PDF magic bytes: %PDF
      const pdfMagicBytes = [0x25, 0x50, 0x44, 0x46];
  
      for (let i = 0; i < pdfMagicBytes.length; i++) {
        if (magicBytes[i] !== pdfMagicBytes[i]) {
          return false;
        }
      }
  
      return true;
    }

    useEffect(() => {
      const verify = async () => {
        const postHashHex = book;

        const request = {
          "PostHashHex": postHashHex
        };
        const response = await deso.nft.getNftEntriesForPostHash(request);
        let nftResponses = response['NFTEntryResponses'];
        let length = nftResponses['length'];
        for (var i = 0; i < length; i++) {
          if (userKey === nftResponses[`${i}`]['OwnerPublicKeyBase58Check']) {
            setVerifying(false);
            setVerified(true);
            break;
          }
        }
        setVerifying(false);
      }
      verify();
    }, [userKey])

    useEffect(() => {
      if (localStorage.getItem('loggedin') === 'true') {
        setUserKey(localStorage.getItem("key"));
      } else {
        setVerifying(false);
      }
    }, []);


    useEffect(() => {
        if (renditionRef.current) {
            renditionRef.current.themes.fontSize(`${sizes[size]}%`)
        }
    }, [size]);

    const onLoginHandler = async () => {
      const response = await deso.identity.login(request);
      const profilePic = await deso.user.getSingleProfilePicture(response.key);
      const profile = await deso.user.getSingleProfile({"PublicKeyBase58Check": response.key});
      // localStorage.setItem("key", response.key);
      // localStorage.setItem('loggedin', 'true');
      setUserKey(response.key);
      dispatch(userActions.logIn({"key": response.key, "profilePic": profilePic, "userName": profile.Profile.Username}));
    }

    useEffect(() => {
        if (user.loggedin === true) {
            localStorage.setItem("key", user.publicKey);
            localStorage.setItem("profilePic", user.profilePic);
            localStorage.setItem("userName", user.userName);
            localStorage.setItem('loggedin', 'true');
        } else {
            localStorage.setItem('loggedin', 'false');
            localStorage.removeItem("key");
            localStorage.removeItem("profilePic");
            localStorage.removeItem("userName");
        }
  }, [user]);

    useEffect(() => {
    if (renditionRef.current) {
        function setRenderSelection(cfiRange, contents) {
            setSelections(selections.concat({
                text: renditionRef.current.getRange(cfiRange).toString(),
                cfiRange
            }))
            renditionRef.current.annotations.add("highlight", cfiRange, {}, null , "hl", {"fill": "yellow", "fill-opacity": "0.5", "mix-blend-mode": "multiply"})
            contents.window.getSelection().removeAllRanges()
        }
        renditionRef.current.on("selected", setRenderSelection)
        return () => {
            renditionRef.current.off("selected", setRenderSelection)
        }
    }
    }, [setSelections, selections]);

    useEffect(() => {
      const handleKeyPress = (event) => {
        if (event.key === 'ArrowRight') {
          nextPage();
        } else if (event.key === 'ArrowLeft') {
          previousPage();
        }
      };
  
      window.addEventListener('keydown', handleKeyPress);
  
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [pageNumber]);

  const locationChanged = (epubcifi) => {
    // if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start
      const chapter = tocRef.current.find((item) => item.href === href)
      setPage(`Page ${displayed.page} of ${displayed.total}`)
      setLocation(epubcifi);
  }

  const onMarketplaceHandler = () => {
    window.location.href = `https://spatiumstories.com/#/marketplace/${book}`;
  }

  const getReader = () => {
      if (isMobile && isEpub) {
        return (
            <ReactReader
            url={url}
            epubInitOptions={{
              openAs: 'epub'
            }}
            epubOptions={{
              flow: "scrolled",
              manager: "continuous"
            }}
            location={location}
            locationChanged={locationChanged}
            tocChanged={toc => tocRef.current = toc}
            getRendition={(rendition) => {
              renditionRef.current = rendition
              // renditionRef.current.themes.default({
              //   '::selection': {
              //     'background': 'blue'
              //   }
              // })
              setSelections([])
            }}
          />
        );
      } else if (isEpub) {
          return (
            <ReactReader
            url={url}
            epubInitOptions={{
              openAs: 'epub'
            }}
            location={location}
            locationChanged={locationChanged}
            tocChanged={toc => tocRef.current = toc}
            getRendition={(rendition) => {
              renditionRef.current = rendition
              // renditionRef.current.themes.default({
              //   '::selection': {
              //     'background': 'blue'
              //   }
              // })
              setSelections([])
            }}
          />
          );
      } else {
        return (
          // <div style={{ display: 'flex' }}>
          // <Document
          //   file={url}
          //   onLoadSuccess={onDocumentLoadSuccess}
          //   options={{
          //     cMapUrl: 'cmaps/',
          //     cMapPacked: true,
          //   }}
          // >
          //   <div style={{ display: 'flex' }}>
          //     <Page pageNumber={pageNumber} width={!isMobile ? window.innerWidth / 2 : window.innerWidth} />
          //     {!isMobile && <Page pageNumber={pageNumber + 1} width={window.innerWidth / 2} />}
          //   </div>
          // </Document>
          // <p>
          //   Page {pageNumber} of {numPages}
          // </p>
          // <Button onClick={previousPage}>Previous</Button>
          // <Button onClick={nextPage}>Next</Button>
          // </div>
          <div>
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            <div style={{ display: 'flex' }}>
              <Page pageNumber={pageNumber} width={!isMobile ? window.innerWidth / 2 : window.innerWidth} />
              {!isMobile && <Page pageNumber={pageNumber + 1} width={window.innerWidth / 2} />}
            </div>          
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
        );
      }
  }

  useEffect(() => {

  }, [tocRef])

  return (
    <>
      {verifying ? (
        <Stack sx={{marginTop:'20%', padding: '20px', alignItems: 'center', justifyItems: 'center'}}>
          <Typography variant="h4">Verifying ownership of the book :)</Typography>
          <CircularProgress color="success" />
        </Stack>
      ) : userKey === null ? (
        <Stack sx={{marginTop:'20%', padding: '20px', alignItems: 'center', justifyItems: 'center'}}>
          <Typography sx={{padding:'20px'}} variant="h4">Please login to read your book</Typography>
          <Button onClick={onLoginHandler} color="secondary" variant="contained" sx={{display: {xs: 'none', md: 'flex'}}}><LoginIcon sx={{paddingRight: '2px'}}/>Login with DeSo</Button>
          <Button onClick={onLoginHandler} color="secondary" variant="contained" sx={{display: {xs: 'flex', md: 'none'}}}>Login</Button>
        </Stack>
      ) : !verified ? (
        <Stack sx={{marginTop:'20%', padding: '20px', alignItems: 'center', justifyItems: 'center'}}>
          <Typography sx={{padding:'20px'}} variant="h4">Looks like you don't own this book :/</Typography>
          <Typography sx={{padding: '20px'}} variant="h6">Head over to the marketplace to buy one!</Typography>
          <Button onClick={onMarketplaceHandler} color="primary" variant="contained" sx={{display: {xs: 'none', md: 'flex'}}}>Marketplace</Button>
          <Typography sx={{padding: '20px'}} variant="p">If you believe this was in error, please contact @Spatium.</Typography>
        </Stack>
      ) : (
        <div style={{ height: "100vh" }}>
          {getReader()}
          {!isMobile && 
              <div style={{position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1}}>
                  {page}
              </div>
          }
          {isEpub &&  
            <div style={{position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'right', zIndex: 1}}>
                        <Button onClick={changeSize} color="secondary" variant="contained" sx={{backgroundColor: 'gray', display: {xs: 'none', md: 'inline'}}}>Toggle Font</Button>
                        <Button onClick={changeSize} color="secondary" variant="contained" sx={{backgroundColor: 'gray', display: {xs: 'inline', md: 'none'}}}>+/-</Button>
            </div>
          }

        </div>
      )}

    </>
  )
};

export default SpatiumReader;