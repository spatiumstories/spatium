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
import QRCode from 'react-qr-code';
import Timer from '../UI/Timer';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const QRCodePayment = (props) => {
    console.log(props.bookData);
    const user = useSelector(state => state.user);
    const [timesUp, setTimesUp] = useState(false);
    const [depositConfirmed, setDepositConfirmed] = useState(false);
    const [depositKey, setDepositKey] = useState(null);
    const [amount, setAmount] = useState(0);
    const deso = new Deso();

    const total = (props.bookData.price / 1000000000).toFixed(2);
    const fee = (0.025 * total).toFixed(4);
    const price = (Number(total) - Number(fee)).toFixed(2);

    // Get amount and qr code
    useEffect(() => {
        let data = {
            "DestinationTicker": "DESO",
            "DestinationAddress": props.bookData.publisher_key
        }
        let data2 = {
            "DestinationTicker": "DESO",
            "DestinationAddress": "BC1YLg9piUDwrwTZfRipfXNq3hW3RZHW3fJZ7soDNNNnftcqrJvyrbq"
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
        };
        fetch('https://megaswap.dev/api/v1/addrs', requestOptions)
            .then(response => response.text())
            .then(data => {
                let json = JSON.parse(data);
                setDepositKey(json['DepositAddresses'][props.currency]);
            });
        fetch(`https://megaswap.dev/api/v1/destination-amount-for-deposit-amount/${props.currency}/DESO/${total}`).then(response => response.text()).then(data => {
            let json = JSON.parse(data);
            setAmount((total / json['SwapRateDestinationTickerPerDepositTicker']) * 1.025);
        });
    }, [])


    useEffect(() => {
        if (amount !== null && depositKey !== null) {
            waitForDeposit();
        }
    }, [amount, depositKey]);

    const waitForDeposit = async () => {
        let nft = props.bookData.postHashHex;
        let newNft = null;
        let successfulPayment = true;  

        // Wait for deposit, then backend mints book
        let data = new FormData();
        data.append("currency", props.currency);
        data.append("deposit_key", depositKey);
        const requestOptions = {
            method: 'POST',
            body: data,
        };

        let depositTx = "";
        await fetch('http://0.0.0.0:4201/api/poll-deposits', requestOptions)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                depositTx = data;
                setDepositConfirmed(true);
        });

        if (depositTx === "") {
            successfulPayment = false;
        }


        if (successfulPayment) {
            data.append("post_hash_hex", nft);
            data.append("buyer_pub_key", user.publicKey);
            data.append("buyer_prv_key", "");
            data.append("author", props.bookData.publisher);
            data.append("nanos", props.bookData.price);
            data.append("deposit_tx", depositTx);

            await fetch('http://0.0.0.0:4201/api/alt-buy-book', requestOptions)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                newNft = data;
            });
        }


        if (newNft !== null) {
            // Place bid on new NFT
            const request = {
                "UpdaterPublicKeyBase58Check": user.publicKey,
                "NFTPostHashHex": newNft,
                "SerialNumber": 1,
                "BidAmountNanos": props.bookData.price,
                "MinFeeRateNanosPerKB": 1000
                };
            const response = await deso.nft.createNftBid(request).catch(e => {
                successfulPayment = false;
                console.log(e);
                props.close();
                props.handleOnFailure();
            });
        } else {
            successfulPayment = false;
        }


        // Pay Author
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
            fetch('http://0.0.0.0:4201/api/accept-bid-and-pay-author', requestOptions)
                .then(response => response.text())
                .then(data => {
                    console.log(data);
            });
            handleSuccessfulPurchase();
        }
    };

    const handleTimesUp = () => {
        setTimesUp(true);
        props.handleTimesUp();
    }
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleSuccessfulPurchase = async () => {
        await delay(3000);
        props.close();
        props.handleOnSuccess();
    }

    const timesUpText = "Simply go to your DeSo account and wait for your transfer to come through. You should see @Gringotts_Wizarding_Bank send you some DeSo. Then head back here and buy your book with DeSo :)";


    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >

        {timesUp ? (
                <React.Fragment>
                    <Alert severity="warning">
                        <AlertTitle>Time Expired!</AlertTitle>
                        Don't worry! — <strong>you can still get yoru book!</strong>
                    </Alert>
                    <Typography variant="p" sx={{paddingTop: '10px', paddingBottom: '10px'}}>{timesUpText}</Typography>
                </React.Fragment>

            ) : !timesUp && depositConfirmed ? (
                <React.Fragment>
                <Typography variant="h6">Deposit Confirmed!</Typography>
                <Typography variant="p" sx={{paddingTop: '10px', paddingBottom: '10px'}}>Verifying Transfer...</Typography>
                <CircularProgress color="success" />
            </React.Fragment>
            ) : (
                <React.Fragment>
                    {amount !== null && depositKey !== null && <Timer handleTimesUp={handleTimesUp}/>}
                    <Typography variant="h6" sx={{paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px'}}>Send {amount} {props.currency} to this address to buy your book!</Typography>
                    <Typography variant="p" sx={{paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px'}}>{depositKey}</Typography>
                    <QRCode value={depositKey ? depositKey : ""}/>
                </React.Fragment>
            )
        }
        </Box>
    );
};

export default QRCodePayment;