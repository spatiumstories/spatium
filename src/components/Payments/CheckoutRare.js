import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import Deso from 'deso-protocol';

const CheckoutRare = (props) => {
    console.log(props.bookData);
    const user = useSelector(state => state.user);
    const [buying, setBuying] = useState(false);
    const deso = new Deso();

    const price = (props.bookData.price / 1000000000).toFixed(2);

    const onBuyHandler = async () => {
        if (!props.enoughFunds) {
            props.handleNotEnoughFunds();
        } else {
            await verifiedEnoughDesoPurchase();
        }
    }


    const verifiedEnoughDesoPurchase = async () => {
        let nft = props.bookData.postHashHex;
        setBuying(true);


        let data = new FormData();
        data.append("post_hash_hex", nft);
        data.append("username", props.buyer.userName);
        data.append("buyer_pub_key", props.buyer.publicKey);
        data.append("buyer_derived_pub_key", props.buyer.derivedPublicKeyBase58Check);
        data.append("buyer_prv_key", props.buyer.derivedSeedHex);
        data.append("author", props.bookData.publisher);
        data.append("nanos", props.bookData.price);
        data.append("expiration_block", props.buyer.expirationBlock);
        data.append("access_sig", props.buyer.accessSignature);
        data.append("tx_spending_limit", props.buyer.transactionSpendingLimitHex);
        data.append("serial_number", props.serial);
        data.append("random_mint", !props.showSerial ? "true" : "false");
        const requestOptions = {
            method: 'POST',
            body: data,
        };

        let successResponse = true;
        let uri = 'https://api.spatiumstories.xyz';
        // let uri = 'http://0.0.0.0:4201';

        const response = await fetch(`${uri}/api/bid-rare-book`, requestOptions).then(response => response.text()).then(data => {
            console.log(data);
        }).catch(e => {
            successResponse = false;
            console.log(e);
            setBuying(false);
            props.handleOnFailure();
        });

        if (successResponse) {
            console.log(response);
            setBuying(false);
            props.close();
            props.handleOnSuccess();
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
                        {props.showSerial && <Typography variant="h6">{props.bookData.title} #{props.serial}</Typography>}
                        {!props.showSerial && <Typography variant="h6">{props.bookData.title}</Typography>}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">{price} DeSo</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{paddingTop: '10px'}}>
                        <Typography variant="h5">Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5">{price} DeSo</Typography>
                    </Grid>
                </Grid>
                <Typography sx={{paddingTop: '10px'}} variant="p">By completing your purchase, you agree to our <a href="https://diamondapp.com/u/Spatium/blog/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Use.</a></Typography>
                <LoadingButton
                    loading={buying}
                    onClick={onBuyHandler}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Complete Purchase!
                </LoadingButton>
                {price > 0 && !props.showSerial && <Button onClick={props.handleAltPayment}>Or Pay With Other Crypto (Beta)</Button>}
        </Box>
    );
};

export default CheckoutRare;