import { Container } from "@mui/system";
import Grid from '@mui/material/Grid';
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";
import Book from "../components/UI/Book";
import { useState, useEffect } from "react";
import Deso from "deso-protocol";
import NoBooks from "../components/UI/NoBooks";
import CheckoutModal from '../components/UI/CheckoutModal';
import Success from '../components/UI/Success';


import React from 'react';

const Marketplace = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [page, setPage] = useState(1);
    const [enoughFunds, setEnoughFunds] = useState(false);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState(new Map());
    const [bookToBuy, setBookToBuy] = useState({type: 'none'});
    const [booksLoaded, setBooksLoaded] = useState(false);
    const deso = new Deso();
    const [open, setOpen] = useState(false);
    const [altPayment, setAltPayment] = useState(false);
    const [derivedKeyData, setDerivedKeyData] = useState({});
    const [currencyDeso, setCurrencyDeso] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(null);
    const BOOKS_PER_PAGE = 6;

    const handleSwitchCurrency = (event) => {
        setCurrencyDeso(event.target.checked);
    }

    useEffect(() => {
        const getExchangeRate = async () => {
            let deso = new Deso();
            const exchangeRate = await deso.metaData.getExchangeRate();
            setExchangeRate(exchangeRate['USDCentsPerDeSoExchangeRate']);
        }
    
        getExchangeRate();
      }, []);

    const handlePageChange = (e, p) => {
        setPage(p);
        console.log(p);
    }

    const handleUseAltPayment = (useAltPayment) => {
      setAltPayment(useAltPayment);
    }

    const handleOpen = async (bookData) => {
        await getDerivedKey(bookData);
        setBookToBuy(bookData);
        setOpen(true);
    }

    const getDerivedKey = async (bookData) => {
        // Get price to approve (if RARE, get highest price for convenience)
        let price = bookData.price;
        if (bookData.type === 'RARE') {
            bookData.left.forEach(book => {
                if (book[1] > price) {
                    price = book[1];
                }
            });
        }
        const request = {
            "publicKey": "",
            "transactionSpendingLimitResponse": {
              "GlobalDESOLimit": Math.round(price * 1.25) + 1700,
              "TransactionCountLimitMap": {
                "AUTHORIZE_DERIVED_KEY": 2
              },
              "NFTOperationLimitMap": {
                "": {
                  "0": {
                    "any": 1
                  }
                }
              },
            },
          };
        const response = await deso.identity.derive(request);
        const userRequest = {
            "PublicKeyBase58Check": response['publicKeyBase58Check']
        };
        const user = await deso.user.getSingleProfile(userRequest);
        setDerivedKeyData({
            derivedSeedHex: response['derivedSeedHex'],
            derivedPublicKeyBase58Check: response['derivedPublicKeyBase58Check'],
            accessSignature: response['accessSignature'],
            expirationBlock: response['expirationBlock'],
            transactionSpendingLimitHex: response['transactionSpendingLimitHex'],
            publicKey: response['publicKeyBase58Check'],
            userName: user['Profile']['Username'],
            balance: user['Profile']['DESOBalanceNanos']
        });
        if (user['Profile']['DESOBalanceNanos'] >= (bookData.price * 1.025) + 1700) {
            setEnoughFunds(true);
        }
        return response;
    }
    const handleClose = () => {
        setOpen(false);
        setAltPayment(false);
        setEnoughFunds(false);
    }
    const [success, setSuccess] = useState(false);

    const handleCloseSuccess = () => {
        setSuccess(false);
    }

    const handleOnSuccess = () => {
        setSuccess(true);
    }

    useEffect(() => {
        if (!booksLoaded) {
            setLoading(true);
            //loading books
            const fetchData = async () => {
                // const response = await fetch('https://api.spatiumstories.xyz/api/marketplace');
                const response = await fetch('http://spatiumtest-env.eba-wke3mfsm.us-east-1.elasticbeanstalk.com/api/marketplace');
                // const response = await fetch('http://0.0.0.0:4201/api/marketplace');
                const books = await response.json();
                let data = [];
                console.log(response['data']['NFTsMap']);
                Object.values(response['data']['NFTsMap']).map((book) => {
                    let postHashHex = book['PostEntryResponse']['PostHashHex'];
                    let price = book['NFTEntryResponses']['0']['MinBidAmountNanos'];
                    let author = "Spatium Publisher";
                    let publisher = "SpatiumPublisher";
                    let description = book['PostEntryResponse']['Body'];
                    let title = "A Spatium Story";
                    let type = "MOD"; //Spatium Publisher public key
                    let bookID = null;
                    let total = null;
                    let left = [];

                    if (book['PostEntryResponse']['PostExtraData']['author'] != null) {
                        author = book['PostEntryResponse']['PostExtraData']['author'];
                    }
                    if (book['PostEntryResponse']['PostExtraData']['published_by'] != null) {
                        publisher = book['PostEntryResponse']['PostExtraData']['published_by'];
                    }
                    if (book['PostEntryResponse']['PostExtraData']['title'] != null) {
                        title = book['PostEntryResponse']['PostExtraData']['title'];
                    }
                    if (book['PostEntryResponse']['PostExtraData']['description'] != null) {
                        description = book['PostEntryResponse']['PostExtraData']['description'];
                    }
                    if (book['PostEntryResponse']['PostExtraData']['type'] != null) {
                        type = book['PostEntryResponse']['PostExtraData']['type'];
                    }
                    if (book['PostEntryResponse']['PostExtraData']['book_id'] != null) {
                        bookID = book['PostEntryResponse']['PostExtraData']['book_id'];
                    }

                    if (type === 'RARE') {
                        total = book['NFTEntryResponses'].length;
                        let booksLeft = [];
                        book['NFTEntryResponses'].forEach(function (item, index) {
                            if (item['OwnerPublicKeyBase58Check'] === 'BC1YLiyXEUuURc9cHYgTnJmT3R9BvMfbQPEgWozofsbzbfFwFbcG7D5' &&
                                item['IsForSale']) {
                                    booksLeft.push(item['SerialNumber']);
                                }
                        });
                        left = booksLeft;
                    }
                    if (bookID !== null) {
                        var newBook = {
                            cover: book['PostEntryResponse']['ImageURLs'][0],
                            body: book['PostEntryResponse']['Body'],
                            author: author,
                            publisher: publisher,
                            title: title,
                            description: description,
                            type: type,
                            postHashHex: postHashHex,
                            price: price,
                            total: total,
                            left: left
                        };
                        data.push(newBook);
                    }
                });
                setBooks(data);
                console.log(response['data']);
                console.log(typeof response['data']);
                setBooksLoaded(true);
                setLoading(false);
            };
            fetchData().catch(console.error);

        }
    }, []);

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handlePublish = () => {
        navigate('/publish');
    }

    const handleRead = () => {
        navigate(`/bookshelf/${user.userName}`);
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    pt: 8,
                    pb: 6,
                }}
            >
            <Container maxWidth="sm">
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Spatium Stories Marketplace
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                We offer both rare edition and Mint on Demand books!
                You can also publish your own book or read your book directly through Spatium Stories!
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                    <Button onClick={handlePublish} variant="contained">Publish My Book!</Button>
                    <Button onClick={handleRead} variant="outlined">Read My Books!</Button>
                </Stack>
            </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="lg">
            <Success open={success} handleClose={handleCloseSuccess} message="Thank you for your purchase! Happy reading!"/>
            <Stack
                alignItems="center"
                spacing={2}
                sx={{paddingTop:'50px'}}
            >
                <CheckoutModal bookToBuy={bookToBuy} open={open} handleClose={handleClose} handleOnSuccess={handleOnSuccess}/>
            </Stack>
            <Grid container spacing={4}>
                {!booksLoaded &&
                cards.map((card) => (
                    <Book loading={true} card={card}/>
                ))}
                {booksLoaded && books.length > 0 &&
                    Object.values(books).map((book) => {
                        console.log(book);
                        return <Book onBuy={handleOpen} loading={false} bookData={book} marketplace={true}/>;
                    })
                }
                {booksLoaded && books.length === 0 &&
                    <Grid item xs={12}>
                        <NoBooks linkToMarketplace={false} message="Coming Soon!!"/>
                    </Grid>
                }
            </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Marketplace;