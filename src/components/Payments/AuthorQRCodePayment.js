import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Deso from 'deso-protocol';
import QRCode from 'react-qr-code';
import Timer from '../UI/Timer';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';




const AuthorQRCodePayment = (props) => {
    const user = useSelector(state => state.user);
    const [timesUp, setTimesUp] = useState(false);
    const [depositConfirmed, setDepositConfirmed] = useState(false);
    const [depositKey, setDepositKey] = useState(null);
    const [amount, setAmount] = useState(0);
    const [progress, setProgress] = useState(0);
    const deso = new Deso();
    const runTimer = useRef(true);

    const total = (props.bookData.convertedPrice / 1e9).toFixed(2);
    const fee = (0.025 * total).toFixed(4);
    const price = (Number(total) - Number(fee)).toFixed(2);

    // Get amount and qr code
    useEffect(() => {
        let data = {
            "DestinationTicker": "DESO",
            "DestinationAddress": props.buyer.publicKey
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

    const awaitNewDeposit = async () => {
        await delay(5000);
        let i = 0;
        let txID = null;
        while (runTimer.current) {
            i += 1;
            await fetch(`https://megaswap.dev/api/v1/new-deposits/${props.currency}/${depositKey}`)
            .then(response => response.text())
            .then(data => {
                let json = JSON.parse(data);
                try {
                    if (json['Deposits'].length > 0) {
                        txID = json['Deposits'][0]['DepositTxId'];
                    }
                } catch (e) {
                    console.log(e);
                }
            });
            await delay(10000);
            if (txID !== null) {
                return txID;
            }
            if (i === 10) {
                setProgress(1);
            } else if (i === 20) {
                setProgress(2);
            }
            if (i === 30) {
                return txID;
            }
        }
        console.log("Timer Stopped");
        return null;
    }

    useEffect(() => {
        return () => {
            runTimer.current = false;
        }
    }, []);
    const waitForDeposit = async () => {
        let author_type = props.bookData.authorType;
        let successfulPayment = true;  

        // Wait for deposit, then backend mints book
        let data = new FormData();
        data.append("author_type", author_type);
        data.append("currency", props.currency);
        data.append("deposit_key", depositKey);
        const requestOptions = {
            method: 'POST',
            body: data,
        };

        let depositTx = await awaitNewDeposit();

        if (depositTx === null) {
            successfulPayment = false;
        } else {
            setDepositConfirmed(true);
        }


        if (successfulPayment) {
            data.append("subscription_type", props.yearly ? "YEARLY" : "MONTHLY");
            data.append("buyer_pub_key", props.buyer.publicKey);
            data.append("buyer_derived_pub_key", props.buyer.derivedPublicKeyBase58Check);
            data.append("buyer_prv_key", props.buyer.derivedSeedHex);
            data.append("author", props.bookData.publisher);
            data.append("nanos", props.bookData.convertedPrice);
            data.append("expiration_block", props.buyer.expirationBlock);
            data.append("access_sig", props.buyer.accessSignature);
            data.append("tx_spending_limit", props.buyer.transactionSpendingLimitHex);
            data.append("deposit_tx", depositTx);
            let uri = process.env.REACT_APP_API;

            const response = await fetch(`${uri}/api/buy-author-nft`, requestOptions)
            .then(response => response.text())
            .then(data => {
                console.log(data);
            }).catch(e => {
                successfulPayment = false;
                console.log(e);
                props.close();
                props.handleOnFailure();
            })
        }

        if (successfulPayment) {
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

    const timesUpText = "Simply go to your DeSo account and wait for your transfer to come through. You should see @Gringotts_Wizarding_Bank send you some DeSo. Then head back here and buy your author NFT with DeSo :)";


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
                        Don't worry! — <strong>you can still get your author NFT!</strong>
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
        {progress === 1 ? (
            <Alert sx={{ marginTop: '10px'}} severity="info">
                <AlertTitle>Please Be Patient...</AlertTitle>
                It can take some time to verify the payment.
            </Alert>
        ) : progress === 2 ? (
            <Alert sx={{ marginTop: '10px'}} severity="info">
                <AlertTitle>Any second now :)</AlertTitle>
                Still waiting...should be any moment now
            </Alert>
        ) : !timesUp ? (
            <Alert sx={{ marginTop: '10px'}} severity="warning">
                <AlertTitle>Please Don't Leave This Window</AlertTitle>
                You won't lose your crypto, but it could cancel your order :/
            </Alert>
        ): (
            <React.Fragment></React.Fragment>
        )}
        </Box>
    );
};

export default AuthorQRCodePayment;