import React, { useRef, useState, useEffect } from "react"
import { ReactReader } from "react-reader"
import { useParams } from "react-router";
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';




const SpatiumReader = () => {
    const { book } = useParams();
    let bookUrl = `https://api.spatiumstories.xyz/api/get-book/${book}`;

    const [size, setSize] = useState(1)
    const sizes = [80, 100, 130];
    const [page, setPage] = useState('')
    const [selections, setSelections] = useState([])
    const [location, setLocation] = useState(null)
    const renditionRef = useRef(null)
    const tocRef = useRef(null)

    const changeSize = () => {
        setSize((size + 1) % 3);
    }


    useEffect(() => {
        if (renditionRef.current) {
            renditionRef.current.themes.fontSize(`${sizes[size]}%`)
        }
    }, [size])

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
    }, [setSelections, selections])

  const locationChanged = (epubcifi) => {
    // if (renditionRef.current && tocRef.current) {
      console.log(renditionRef);
      console.log(tocRef);
      const { displayed, href } = renditionRef.current.location.start
      const chapter = tocRef.current.find((item) => item.href === href)
      setPage(`Page ${displayed.page} of ${displayed.total}`)
      setLocation(epubcifi);
  }

  useEffect(() => {

  }, [tocRef])

  return (
    <>
      <div style={{ height: "100vh" }}>
        <ReactReader
          url={bookUrl}
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
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1}}>
        {page}
      </div>
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'right', zIndex: 1}}>
                <Button onClick={changeSize} color="secondary" variant="contained" sx={{backgroundColor: 'gray', display: {xs: 'none', md: 'inline'}}}>Toggle Font</Button>
                <Button onClick={changeSize} color="secondary" variant="contained" sx={{backgroundColor: 'gray', display: {xs: 'inline', md: 'none'}}}>+/-</Button>
      </div>

    </div>

    </>
  )
};

export default SpatiumReader;