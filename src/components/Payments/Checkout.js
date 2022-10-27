import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import Deso from 'deso-protocol';
import Countdown from 'react-countdown';

const Checkout = (props) => {
    console.log(props.bookData);
    const user = useSelector(state => state.user);
    const [buying, setBuying] = useState(false);
    const [nft, setNFT] = useState();
    const deso = new Deso();

    const total = (props.bookData.price / 1000000000).toFixed(2);

    const onBuyHandler = async () => {
        let nft = props.bookData.postHashHex;
        let successfulPayment = true;          
        setBuying(true);

        // Mint New NFT and Set For Sale
        let data = new FormData();
        data.append("post_hash_hex", nft);
        data.append("buyer_pub_key", user.publicKey);
        data.append("buyer_prv_key", "");
        data.append("author", props.bookData.publisher);
        data.append("nanos", props.bookData.price);
        const requestOptions = {
            method: 'POST',
            body: data,
        };
        await fetch('https://api.spatiumstories.xyz/api/buy-book', requestOptions)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setNFT(data);
                nft = data;
        });

        // Place bid on new NFT
        const request = {
            "UpdaterPublicKeyBase58Check": user.publicKey,
            "NFTPostHashHex": nft,
            "SerialNumber": 1,
            "BidAmountNanos": props.bookData.price,
            "MinFeeRateNanosPerKB": 1000
          };
        const response = await deso.nft.createNftBid(request).catch(e => {
            successfulPayment = false;
            console.log(e);
            setBuying(false);
            props.close();
            props.handleOnFailure();
        });


        // Accept NFT Bid and Pay Author
        if (successfulPayment) {
            let data = new FormData();
            data.append("post_hash_hex", nft);
            data.append("buyer", user.publicKey);
            data.append("author", props.bookData.publisher);
            data.append("amount", props.bookData.price);
            const requestOptions = {
                method: 'POST',
                body: data,
            };
            fetch('https://api.spatiumstories.xyz/api/accept-bid-and-pay-author', requestOptions)
                .then(response => response.text())
                .then(data => {
                    console.log(data);
            });
            setBuying(false);
            props.close();
            props.handleOnSuccess();
        }

    }

    const handleAltPayment = () => {
        props.handleAltPayment(true);
    }

    const getButtonText = (paid) => {
        if (!paid) {
            return ("Get Your FREE Book!");
        } else {
            return ("Complete Purchase!");
        }
    }

    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <ShoppingCartTwoToneIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Checkout
            </Typography>
                <Grid container sx={{ paddingTop: '20px', width: '100%'}}>
                    <Grid item xs={6} alignItems='flex-start'>
                        <Typography variant="h6">{props.bookData.title} x1</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">{total} DeSo</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{paddingTop: '10px'}}>
                        <Typography variant="h5">Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5">{total} DeSo</Typography>
                    </Grid>
                </Grid>
                <Typography sx={{paddingTop: '10px'}} variant="p">By completing your purchase, you agree to our <a href="https://diamondapp.com/u/Spatium/blog/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Use.</a></Typography>
                <LoadingButton
                    loading={buying}
                    onClick={onBuyHandler}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                {getButtonText(total > 0)}
                </LoadingButton>
                {total > 0 && <Button onClick={props.handleAltPayment}>Or Pay With Other Crypto (Beta)</Button>}
        </Box>
    );
};

export default Checkout;