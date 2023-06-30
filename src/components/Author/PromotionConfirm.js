import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import press from '../../assets/hour.png';
import { useState } from 'react';
import ImportantModal from '../UI/ImportantModal';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Deso from 'deso-protocol';



const confirmText = "You sure you want to make these changes?";
const SPATIUM_PUBLISHER_PUBLIC_KEY = "BC1YLjC6xgSaoesmZmBgAWFxuxVTAaaAySQbiuSnCfb5eBBiWs4QgfP";


const PromotionConfirm = (props) => {
    const [confirm, setConfirm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [edited, setEdited] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleMarketplace = () => {
        navigate('/r2m2');
    }

    const handleConfirmOpen = () => {
        setConfirm(true);
    }

    const handleConfirmClose = () => {
        setConfirm(false);
    }

    const handleEditing = () => {
        setEditing(true);
        setConfirm(false);
        // Need to add in calls to make book changes here
        createPromotion();
    }

    const createPromotion = async () => {
        console.log(props.books);
        let price = getPrice(props.details.currency, props.details.price);
        console.log(price);
        let bookToSerialMap = await createSerialMap(props.books);
        console.log(bookToSerialMap);
        await editBooks(props.books, bookToSerialMap);
        console.log("sending promotion");
        // sendPromotion(bookToSerialMap);
    }

    const editBooks = async (books, serialMap) => {
        const promises = books.map(async (book) => {
            editBook(book.postHashHex, serialMap.get(book.postHashHex));
        });
        await Promise.all(promises);
    }

    const createSerialMap = async (books) => {
        let bookToSerialMap = new Map();
        const promises = books.map(async (book) => {
            let serials = await getSerials(book.postHashHex);
            bookToSerialMap.set(book.postHashHex, serials);
        });
        await Promise.all(promises);
        return bookToSerialMap;
    }

    const getSerials = async (postHashHex) => {
        const deso = new Deso();
        let nftEntryResponses = await deso.nft.getNftEntriesForPostHash({"PostHashHex": postHashHex});
        let serials = [];
        nftEntryResponses["NFTEntryResponses"].forEach(nft => {
            if (nft["OwnerPublicKeyBase58Check"] === SPATIUM_PUBLISHER_PUBLIC_KEY) {
                serials.push(nft["SerialNumber"]);
            }
        });
        console.log(serials);
        return serials;
    }

    const editBook = async (postHashHex, serials) => {
        let price = getPrice(props.details.currency, props.details.price);
        console.log(price / 1e9);
        let data = new FormData();
        //post_hash_hex
        data.append("post_hash_hex", postHashHex);
        //price
        data.append("price", price);
        //serials
        data.append("serials", serials.join(","));
        //for_sale
        data.append("for_sale", false);

        const requestOptions = {
            method: 'POST',
            body: data,
        };
        // let uri = 'http://0.0.0.0:4201';
        let uri = 'https://api.spatiumstories.xyz';
        // let uri = 'http://spatiumtest-env.eba-wke3mfsm.us-east-1.elasticbeanstalk.com'
        try {
            const response = await fetch(`${uri}/api/change-price`, requestOptions);
            const responseData = await response.text();
            console.log(responseData);
          } catch (error) {
            console.log(error);
          }
    }

    const sendPromotion = async (serialMap) => {
        let uri = "https://tkvr4urfac.execute-api.us-east-1.amazonaws.com/default/rareMint";
        let data = mapToJson(serialMap);
        console.log(data);
        const requestOptions = {
            method: "POST",
            body: data,
        };

        await fetch(uri, requestOptions)
        .then(response => response.text())
        .then(data => {
            setEdited(true);
            setEditing(false);
        }).catch(e => {
            console.log(e);
        });
    }

    function mapToJson(map) {
        const nfts = [];
      
        for (const [key, value] of map.entries()) {
            nfts.push({
                "post_hash_hex": key,
                "serials": value,
            });
        }
      
        return JSON.stringify({"nfts": nfts});
    }


    const getPrice = (currency, amount) => {
        if (currency === "deso") {
            return Math.round((amount * 1e9));
        }
        let amountInCents = amount * 100;
        let amountInDeso = amountInCents / (props.exchangeRate === null ? 1 : props.exchangeRate);
        return Math.round((amountInDeso * 1e9));
    }


    
    return (
        <React.Fragment>
            {!editing && !edited ? (
                <React.Fragment>
            <Stack alignItems="center" justifyItems="center" spacing={2}>
                <Typography variant="h4" gutterBottom>
                    Absolutely sure you're ready?
                </Typography>
                <Typography variant="h6">
                    You selected {props.books.length} books
                </Typography>
                <img width="100%" height="100%" src={press}/>
                {props.activeStep !== 0 && (
                    <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                    </Button>
                )}
                <Button onClick={handleConfirmOpen} variant="contained" component="label">
                    Create My Promotion!
                </Button>
            </Stack>
        </React.Fragment>
            ): editing ?
            (
                <Stack alignItems="center" justifyItems="center" spacing={2}>
                    <Typography variant="h6">Making your NFT Book Promotion!</Typography>
                    <Typography variant="p" align="center" sx={{paddingTop: '10px', paddingBottom: '10px'}}>This will take a second. Please be patient :)</Typography>
                    <CircularProgress color="success" />
                </Stack>            
            ) : (
                <Stack alignItems="center" justifyItems="center" spacing={2}>
                    <Typography variant="h6">Congratulations!!!</Typography>
                    <Typography variant="p" align="center" sx={{paddingTop: '10px', paddingBottom: '10px'}}>Your book promotion has been published!! Check it out on the R2M2 marketplace!</Typography>
                    <Button onClick={handleMarketplace} variant="contained" component="label">
                        R2M2
                    </Button>
                    <iframe src="https://giphy.com/embed/IwAZ6dvvvaTtdI8SD5" width="480" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/theoffice-the-office-tv-michaels-birthday-IwAZ6dvvvaTtdI8SD5">via GIPHY</a></p>
                </Stack>
            )
        
        
        }
        <ImportantModal buttonText={"Create"} title={"Last Check!"} open={confirm} cancel={handleConfirmClose} publish={handleEditing}>
            <Typography>{confirmText}</Typography>
            <Typography sx={{padddingTop: '5px'}}>By clicking Create, you are agreeing to our <a href="https://diamondapp.com/u/Spatium/blog/spatium-stories-author-terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a></Typography>
        </ImportantModal>
      </React.Fragment>
    );
};

export default PromotionConfirm;