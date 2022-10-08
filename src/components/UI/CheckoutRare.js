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
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import Deso from 'deso-protocol';
import InputUnstyled from '@mui/base/InputUnstyled';

const CheckoutRare = (props) => {
    console.log(props.bookData);
    const user = useSelector(state => state.user);
    const [buying, setBuying] = useState(false);
    const deso = new Deso();

    const price = (props.bookData.price / 1000000000).toFixed(2);


    const onBuyHandler = async () => {
        let nft = props.bookData.postHashHex;
        // const request = {
        //     "publicKey": user.publicKey,
        //     "transactionSpendingLimitResponse": {
        //       "GlobalDESOLimit": props.bookData.price,
        //       "NFTOperationLimitMap": {
        //         [nft] : {
        //             "0": {
        //                 "any": 1,
        //             }
        //         }
        //     },
        //     }
        //   };
        // const response = await deso.identity.derive(request);
        // deso.identity.submitTransaction()

        const request2 = {
            "UpdaterPublicKeyBase58Check": user.publicKey,
            "NFTPostHashHex": nft,
            "SerialNumber": Number(props.serial),
            "BidAmountNanos": Number(props.bookData.price),
            "MinFeeRateNanosPerKB": 1000
          };
          
        console.log(request2);
        setBuying(true);
        deso.nft.createNftBid(request2)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        setBuying(false);
        props.close();
        props.handleOnSuccess();
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
                        <Typography variant="h6">{props.bookData.title} #{props.serial}</Typography>
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

export default CheckoutRare;