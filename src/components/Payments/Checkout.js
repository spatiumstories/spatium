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
    const deso = new Deso();

    const total = (props.bookData.price / 1000000000).toFixed(2);

    const onBuyHandler = async () => {
        let nft = props.bookData.postHashHex;
        setBuying(true);

        // Mint New NFT
        // 1. We have a derived key
        // 2. Pass all info to buy-book api
        // 3. buy-book will mint new book and either set for sale
        //      or transfer it
        // 4. Using the derived key, either accept transfer OR make bid
        // 5. Then pay author

        let data = new FormData();
        data.append("post_hash_hex", nft);
        data.append("buyer_pub_key", user.publicKey);
        data.append("buyer_derived_pub_key", props.buyer.derivedPublicKeyBase58Check);
        data.append("buyer_prv_key", props.buyer.derivedSeedHex);
        data.append("author", props.bookData.publisher);
        data.append("nanos", props.bookData.price);
        data.append("expiration_block", props.buyer.expirationBlock);
        data.append("access_sig", props.buyer.accessSignature);
        data.append("tx_spending_limit", props.buyer.transactionSpendingLimitHex);
        const requestOptions = {
            method: 'POST',
            body: data,
        };
        let successResponse = true;

        const response = await fetch('http://0.0.0.0:4201/api/buy-book', requestOptions).catch(e => {
            successResponse = false;
            console.log(e);
            setBuying(false);
            props.close();
            props.handleOnFailure();
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        });

        if (successResponse) {
            console.log(response);
            setBuying(false);
            props.close();
            props.handleOnSuccess();
        }

    }

    const acceptNFT = async (nft) => {
        console.log(nft);
        const request = {
            "UpdaterPublicKeyBase58Check": user.publicKey,
            "NFTPostHashHex": nft,
            "SerialNumber": 1,
            "MinFeeRateNanosPerKB": 1000
          };
        let successResponse = true;
        const response = await deso.nft.acceptNftTransfer(request).catch(e => {
            successResponse = false;
            console.log(e);
            setBuying(false);
            props.close();
            props.handleOnFailure();
        });
        if (successResponse) {
            console.log(response);
            setBuying(false);
            props.close();
            props.handleOnSuccess();
        }
    };

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