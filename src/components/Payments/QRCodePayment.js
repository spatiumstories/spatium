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

const QRCodePayment = (props) => {
    console.log(props.bookData);
    const user = useSelector(state => state.user);
    const [buying, setBuying] = useState(false);
    const [nft, setNFT] = useState();
    const [depositKey, setDepositKey] = useState(null);
    const [amount, setAmount] = useState(0);
    const deso = new Deso();

    const total = (props.bookData.price / 1000000000).toFixed(2);
    const fee = (0.025 * total).toFixed(4);
    const price = (Number(total) - Number(fee)).toFixed(2);
    // const amount = total;

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
            setAmount(total / json['SwapRateDestinationTickerPerDepositTicker']);
        });
    }, [])


    useEffect(() => {
        if (amount !== null && depositKey !== null) {
            waitForDeposit();
        }
    }, [amount, depositKey]);

    const waitForDeposit = async () => {
        if (amount !== null && depositKey !== null) {
            let deposit = [];
            let counter = 0;
            while (deposit.length === 0) {
                counter = counter + 1;
                fetch(`https://megaswap.dev/api/v1/new-deposits/${props.currency}/${depositKey}`).then(response => response.text()).then(data => {
                    let json = JSON.parse(data);
                    deposit = json['Deposits'];
                });
                console.log(deposit);
                if (counter === 5) {
                    deposit = [1, 2, 3];
                }
                await new Promise(r => setTimeout(r, 15000));
                console.log("after 7 seconds?");
            }
        }
    };

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
          
          
        setBuying(true);


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


    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            {!buying ? (
                <React.Fragment>
                    <Typography variant="h6">Send {amount} {props.currency} to this address to buy your book!</Typography>
                    <Typography variant="p" sx={{paddingTop: '10px', paddingBottom: '10px'}}>{depositKey}</Typography>
                    <QRCode value={depositKey ? depositKey : ""}/>
                </React.Fragment>
            ) :(
                <Typography>wait</Typography>
            )
            }
        </Box>
    );
};

export default QRCodePayment;