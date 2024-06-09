import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import Deso from 'deso-protocol';

const AuthorCheckout = (props) => {
    const user = useSelector(state => state.user);
    const [buying, setBuying] = useState(false);
    const deso = new Deso();

    const total = (props.nftToBuy.convertedPrice / 1e9).toFixed(2);

    const onBuyHandler = async () => {
        if (!props.enoughFunds) {
            props.handleNotEnoughFunds();
        } else {
            await verifiedEnoughDesoPurchase();
        }
    }

    const verifiedEnoughDesoPurchase = async () => {

        let author_type = props.nftToBuy.authorType;
        setBuying(true);

        let data = new FormData();
        // MultipartFormDataField::text("author_type"),
        // MultipartFormDataField::text("subscription_type"),



        data.append("author_type", author_type);
        data.append("subscription_type", props.yearly ? "YEARLY" : "MONTHLY");
        data.append("buyer_pub_key", props.buyer.publicKey);
        data.append("buyer_derived_pub_key", props.buyer.derivedPublicKeyBase58Check);
        data.append("buyer_prv_key", props.buyer.derivedSeedHex);
        data.append("author", props.nftToBuy.publisher);
        data.append("nanos", props.nftToBuy.convertedPrice);
        data.append("expiration_block", props.buyer.expirationBlock);
        data.append("access_sig", props.buyer.accessSignature);
        data.append("tx_spending_limit", props.buyer.transactionSpendingLimitHex);
        const requestOptions = {
            method: 'POST',
            body: data,
        };
        let successResponse = true;
        let uri = process.env.REACT_APP_API;

        const response = await fetch(`${uri}/api/buy-author-nft`, requestOptions)
        .then(response => response.text())
        .then(data => {
            console.log(data);
        }).catch(e => {
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

    }


    const handleAltPayment = () => {
        props.handleAltPayment(true);
    }

    const getButtonText = (paid) => {
        if (!paid) {
            return ("Start Publishing for FREE!");
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
                <Grid container sx={{ paddingTop: '20px', width: '100%'}}>
                    <Grid item xs={6} alignItems='flex-start'>
                        <Typography variant="h6">{props.nftToBuy.title} x1</Typography>
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
                <Typography sx={{paddingTop: '10px'}} variant="p">By completing your purchase, you agree to our <a href="https://diamondapp.com/u/Spatium/blog/spatium-stories-author-terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms of Use.</a></Typography>
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

export default AuthorCheckout;