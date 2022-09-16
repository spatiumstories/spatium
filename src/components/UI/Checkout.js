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
                    "publicKey": user.publicKey,
                    "transactionSpendingLimitResponse": {
                        "NFTOperationLimitMap": {
                            [nft] : {
                                "0": {
                                "accept_transfer": 1,
                                }
                            }
                        },
                    }
                };
                const response = await deso.identity.derive(request);
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
        // const derive = window.open('https://identity.deso.org/derive');
        // center the window.
        // const h = 1000;
        // const w = 800;
        // const y = window.outerHeight / 2 + window.screenY - h / 2;
        // const x = window.outerWidth / 2 + window.screenX - w / 2;
        // const win = window.open(`https://identity.deso.org/derive?publicKey=${user.publicKey}&transactionSpendingLimitResponse=${JSON.stringify(request)}`, request, `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`);
        // // https://identity.deso.org/derive?publicKey=BC1YLhx475r19kA9CkzchSWen6hbF6W2GHTFEPqngMd2YwtFfAewRjE&transactionSpendingLimitResponse=%7B%22GlobalDESOLimit%22:100000000000,%22TransactionCountLimitMap%22:%7B%22SUBMIT_POST%22:120948,%22FOLLOW%22:82943%7D,%22CreatorCoinOperationLimitMap%22:%7B%22%22:%7B%22any%22:2183%7D,%22BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s%22:%7B%22buy%22:123,%22sell%22:4123,%22transfer%22:9198%7D%7D,%22DAOCoinOperationLimitMap%22:%7B%22%22:%7B%22mint%22:1%7D%7D,%22NFTOperationLimitMap%22:%7B%2201855d9ca9c54d797e53df0954204ae7d744c98fe853bc846f5663459ac9cb7b%22:%7B%220%22:%7B%22update%22:10,%22nft_bid%22:501%7D%7D%7D,%22DAOCoinLimitOrderLimitMap%22:%7B%22DESO%22:%7B%22BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s%22:10%7D,%22BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s%22:%7B%22DESO%22:5%7D,%22BC1YLjMYu2ahUtWgSX34cNLeM9BM9y37cqXzxAjbvPfbxppDh16Jwog%22:%7B%22BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s%22:1092%7D%7D%7D
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