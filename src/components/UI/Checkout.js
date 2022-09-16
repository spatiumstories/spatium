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
import Success from './Success';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import Deso from 'deso-protocol';

const Checkout = (props) => {
    console.log(props.bookData);
    const user = useSelector(state => state.user);
    const [buying, setBuying] = useState(false);
    const [nft, setNFT] = useState();
    const deso = new Deso();

    const price = (props.bookData.price / 1000000000).toFixed(2);
    const fee = 0.025 * price;
    const total = (Number(price) + Number(fee)).toFixed(2);

    useEffect(() => {
        if (buying) {
            const acceptNFT = async () => {
                const request = {
                    "UpdaterPublicKeyBase58Check": user.publicKey,
                    "NFTPostHashHex": nft,
                    "SerialNumber": 0,
                    "MinFeeRateNanosPerKB": 1000
                  };
                const response = await deso.nft.acceptNftBid(request);
                console.log(response);
                setBuying(false);
                props.close();
                props.handleOnSuccess();
            };
            acceptNFT().catch(console.error);
        }
    }, [nft]);

    const onBuyHandler = async () => {
        let nft = props.bookData.postHashHex;
        const request = {
            "publicKey": user.publicKey,
            "transactionSpendingLimitResponse": {
              "GlobalDESOLimit": props.bookData.price + (props.bookData.price * 0.025),
              "TransactionCountLimitMap": {
                "BASIC_TRANSFER": 2,
              }
            }
          };
          
          
        setBuying(true);
        const response = await deso.identity.derive(request);
        console.log(response);

        const buyNFTResponse = await fetch(nft);
        setNFT(buyNFTResponse);
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
                <LoadingButton
                    loading={buying}
                    onClick={onBuyHandler}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Complete Purchase!
                </LoadingButton>
        </Box>
    );
};

export default Checkout;