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

const Checkout = (props) => {
    console.log(props.bookData);
    const user = useSelector(state => state.user);
    const [buying, setBuying] = useState(false);
    const [nft, setNFT] = useState();
    const deso = new Deso();

    const total = (props.bookData.price / 1000000000).toFixed(2);
    const fee = (0.025 * total).toFixed(4);
    const price = (Number(total) - Number(fee)).toFixed(2);
    // const total = (Number(price) + Number(fee)).toFixed(2);

    useEffect(() => {
        if (buying) {
            const acceptNFT = async () => {
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
            acceptNFT().catch(console.error);
        }
    }, [nft]);

    const onBuyHandler = async () => {
        let nft = props.bookData.postHashHex;
        let successfulPayment = true;
        // const request = {
        //     "publicKey": user.publicKey,
        //     "transactionSpendingLimitResponse": {
        //       "GlobalDESOLimit": (props.bookData.price + (props.bookData.price * 0.025)) * 1000,
        //       "TransactionCountLimitMap": {
        //         "BASIC_TRANSFER": 2,
        //       }
        //     }
        //   };
          
          
        setBuying(true);

        const authorPaymentRequest = {
            "SenderPublicKeyBase58Check": user.publicKey,
            "RecipientPublicKeyOrUsername": props.bookData.publisher,
            "AmountNanos": (props.bookData.price - (props.bookData.price * 0.025)),
            "MinFeeRateNanosPerKB": 1000
          };
        console.log(buying);

        const author_payment = await deso.wallet.sendDesoRequest(authorPaymentRequest).catch(e => {
            successfulPayment = false;
            setBuying(false);
            props.close();
            props.handleOnFailure();
        });

        if (successfulPayment) {
            console.log("sending fee payment");
            const feePaymentRequest = {
                "SenderPublicKeyBase58Check": user.publicKey,
                "RecipientPublicKeyOrUsername": "BC1YLg9piUDwrwTZfRipfXNq3hW3RZHW3fJZ7soDNNNnftcqrJvyrbq",
                "AmountNanos": props.bookData.price * 0.025,
                "MinFeeRateNanosPerKB": 1000
            };
            const fee_payment = await deso.wallet.sendDesoRequest(feePaymentRequest).catch(e => {
                successfulPayment = false;
                setBuying(false);
                props.close();
                props.handleOnFailure();
            });
        }


        if (successfulPayment) {
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
            fetch('https://api.spatiumstories.xyz/api/buy-book', requestOptions)
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    setNFT(data);
                });
        }
    }

    const handleAltPayment = () => {
        props.handleAltPayment(true);
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
                        <Typography variant="h6">{price} DeSo</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{paddingTop: '10px'}}>
                        <Typography variant="h6">Spatium Stories Fee</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">{fee} DeSo</Typography>
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
                Complete Purchase!
                </LoadingButton>
                {/* <Button onClick={props.handleAltPayment}>Or Pay With Other Crypto (Beta)</Button> */}
        </Box>
    );
};

export default Checkout;