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
import { request } from 'http';



const confirmText = "You sure you want to make these changes?";
const SPATIUM_PUBLISHER_PUBLIC_KEY = "BC1YLjC6xgSaoesmZmBgAWFxuxVTAaaAySQbiuSnCfb5eBBiWs4QgfP";

const EditBookConfirm = (props) => {
    const [confirm, setConfirm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [edited, setEdited] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleMarketplace = () => {
        navigate('/marketplace');
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
        editBook();
    }

    const editBook = async () => {
        console.log(props.details);
        let price = getPrice(props.details.currency, props.details.price);
        console.log(price / 1e9);
        let data = new FormData();
        //post_hash_hex
        data.append("post_hash_hex", props.book.postHashHex);
        //price
        data.append("price", price);
        //serials
        let serials = await getSerials(props.book.postHashHex);
        data.append("serials", serials.join(","));
        //for_sale
        data.append("for_sale", props.details.forSale);

        const requestOptions = {
            method: 'POST',
            body: data,
        };
        // let uri = 'http://0.0.0.0:4201';
        // let uri = 'https://api.spatiumstories.xyz';
        let uri = 'http://spatiumtest-env.eba-wke3mfsm.us-east-1.elasticbeanstalk.com'
        await fetch(`${uri}/api/change-price`, requestOptions)
        .then(response => response.text())
        .then(data => {
            setEdited(true);
            setEditing(false);
        }).catch(e => {
            console.log(e);
        });

        if (props.details.pegged === "true") {
            let usdPrice = props.details.price;
            if (props.details.currency === "DESO") {
                usdPrice = getUSDPrice(usdPrice);
            }
            pegBook(props.book.postHashHex, usdPrice);
        }

    }

    const pegBook = async (postHashHex, price) => {
        let uri = "https://r6pzu4a635.execute-api.us-east-1.amazonaws.com/prod/api";
        let data = {
            postHashHex,
            price,
        };
        const requestOptions = {
            method: "POST",
            body: data,
        };
        await fetch (uri, requestOptions)
        .then(response => response.text())
        .then(data => {
            console.log(data);
        }).catch(e => {
            console.log(e);
        });
    }

    const getSerials = async (postHashHex) => {
        const deso = new Deso();
        let nftEntryResponses = await deso.nft.getNftEntriesForPostHash({"PostHashHex": postHashHex});
        let serials = [];
        nftEntryResponses.array.forEach(nft => {
            if (nft["OwnerPublicKeyBase58Check"] === SPATIUM_PUBLISHER_PUBLIC_KEY) {
                serials.push(nft["SerialNumber"]);
            }
        });
        return serials;
    }


    const getPrice = (currency, amount) => {
        if (currency === "deso") {
            return Math.round((amount * 1e9));
        }
        let amountInCents = amount * 100;
        let amountInDeso = amountInCents / (props.exchangeRate === null ? 1 : props.exchangeRate);
        return Math.round((amountInDeso * 1e9));
    }

    const getUSDPrice = (amount) => {
        // Deso = cents / rate
        // cents = Deso * rate
        // dollars = cents / 100
        let cents = amount * props.exchangeRate;
        return Math.round(cents / 100);
    }


    
    return (
        <React.Fragment>
            {!editing && !edited ? (
                <React.Fragment>
            <Stack alignItems="center" justifyItems="center" spacing={2}>
                <Typography variant="h4" gutterBottom>
                    Absolutely sure you're ready?
                </Typography>
                <img width="100%" height="100%" src={press}/>
                <Button onClick={handleConfirmOpen} variant="contained" component="label">
                    Edit My Book!
                </Button>
            </Stack>
        </React.Fragment>
            ): editing ?
            (
                <Stack alignItems="center" justifyItems="center" spacing={2}>
                    <Typography variant="h6">Making your NFT Book Changes!</Typography>
                    <Typography variant="p" align="center" sx={{paddingTop: '10px', paddingBottom: '10px'}}>This will take a second. Please be patient :)</Typography>
                    <CircularProgress color="success" />
                </Stack>            
            ) : (
                <Stack alignItems="center" justifyItems="center" spacing={2}>
                    <Typography variant="h6">Congratulations!!!</Typography>
                    <Typography variant="p" align="center" sx={{paddingTop: '10px', paddingBottom: '10px'}}>Your book has been published!! Check it out on the marketplace!</Typography>
                    <Button onClick={handleMarketplace} variant="contained" component="label">
                        Marketplace
                    </Button>
                    <iframe src="https://giphy.com/embed/IwAZ6dvvvaTtdI8SD5" width="480" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/theoffice-the-office-tv-michaels-birthday-IwAZ6dvvvaTtdI8SD5">via GIPHY</a></p>
                </Stack>
            )
        
        
        }
        <ImportantModal buttonText={"Edit"} title={"Last Check!"} open={confirm} cancel={handleConfirmClose} publish={handleEditing}>
            <Typography>{confirmText}</Typography>
            <Typography sx={{padddingTop: '5px'}}>By clicking Edit, you are agreeing to our <a href="https://diamondapp.com/u/Spatium/blog/spatium-stories-author-terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a></Typography>
        </ImportantModal>
      </React.Fragment>
    );
};

export default EditBookConfirm;