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



const confirmText = "Publishing an NFT book is final. You cannot edit any details other than the price from here on out. Still ready to publish?";

const FinalConfirm = (props) => {
    const [confirm, setConfirm] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [published, setPublished] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => state.user);


    const handleMarketplace = () => {
        navigate('/marketplace');
    }

    const handleConfirmOpen = () => {
        setConfirm(true);
    }

    const handleConfirmClose = () => {
        setConfirm(false);
    }

    const handlePublish = () => {
        setConfirm(false);
        setPublishing(true);
        publish();
    }

    const getPrice = (currency, amount) => {
        if (currency === "deso") {
            return Math.round((amount * 1e9));
        }
        let amountInCents = amount * 100;
        let amountInDeso = amountInCents / (props.exchangeRate === null ? 1 : props.exchangeRate);
        return Math.round((amountInDeso * 1e9));
    }

    const getGenreList = (fictionType, genreList) => {
        let result = "";
        result += fictionType + ",";
        for (var i = 0; i < genreList.length; i++) {
            if (i + 1 === genreList.length) {
                result += genreList[i];
            } else {
                result += genreList[i] + ",";
            }
        }
        return result;
    }

        /**
     * Constructing Book Data
     *  This comes from props.book
     * cover: "",
        file: "",
        title: "",
        subtitle: "",
        description: "",
        currency: "usd",
        amount: "",
        quantity: "",
        type: "mod",
        author: "",
     * This comes from props.details
        royalties: "",
        genre: [],
        forSale: true,
        dragon: true,
        format: "",
        fictionType: "",
        mintingAccount: "spatium",
     */
    const publish = async () => {
        let data = new FormData();
        data.append("photo", props.book.cover);
        data.append("book", props.book.file);
        data.append("title", props.book.title);
        data.append("subtitle", props.book.subtitle);
        data.append("published_by", user.publicKey);
        data.append("author_royalty", props.details.royalties * 100);
        data.append("description", props.book.description);
        data.append("book_type", props.book.type === "mod" ? "MOD" : "RARE");
        data.append("num_copies", props.book.type === "rare" ? props.book.quantity : 1);
        data.append("price", getPrice(props.book.currency, props.book.amount));
        data.append("author", props.book.author);
        data.append("for_sale", props.details.forSale && props.book.type === "rare");
        data.append("buy_now", props.details.forSale && props.book.type === "rare");
        data.append("genre", getGenreList(props.details.fictionType, props.details.genre));
        data.append("dragon_protected", props.details.dragon);
        const requestOptions = {
            method: 'POST',
            body: data,
        };
        let uri = 'http://0.0.0.0:4201';
        const response = await fetch(`${uri}/api/publish-book`, requestOptions)
        .then(response => response.text())
        .then(data => {
            console.log(data);
            setPublishing(false);
            setPublished(true);
        }).catch(e => {
            console.log(e);
        });
    }

    

    const cover = URL.createObjectURL(props.book.cover);

    return (
        <React.Fragment>
            {!publishing && !published ? (
                <React.Fragment>
            <Stack alignItems="center" justifyItems="center" spacing={2}>
                <Typography variant="h4" gutterBottom>
                    Last Step!
                </Typography>
                <Typography align="center" variant="h6" gutterBottom>
                    You are just one more step away from the bliss of publishing a book in web3!
                </Typography>
                <img width="100%" height="100%" src={press}/>
                <Button onClick={handleConfirmOpen} variant="contained" component="label">
                    Publish My Book!
                </Button>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {props.activeStep !== 0 && (
                <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
                </Button>
            )}
        </Box>
        </React.Fragment>
            ): publishing ?
            (
                <Stack alignItems="center" justifyItems="center" spacing={2}>
                    <Typography variant="h6">Minting your NFT Book!</Typography>
                    <Typography variant="p" align="center" sx={{paddingTop: '10px', paddingBottom: '10px'}}>This will take a second. Please be patient :)</Typography>
                    <CircularProgress color="success" />
                    <img src={cover} width="100%" height="100%"/>
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
        <ImportantModal title={"Last Check!"} open={confirm} cancel={handleConfirmClose} publish={handlePublish}>
            <Typography>{confirmText}</Typography>
        </ImportantModal>
      </React.Fragment>
    );
};

export default FinalConfirm;