import { Container } from "@mui/system";
import Grid from '@mui/material/Grid';
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";
import Book from "../components/UI/Book";
import { useState, useEffect, useRef } from "react";
import Deso from "deso-protocol";
import NoBooks from "../components/UI/NoBooks";
import CheckoutModal from '../components/Payments/CheckoutModal';
import Success from '../components/UI/Success';
import Failure from "../components/UI/Failure";
import Switch from '@mui/material/Switch';



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
              "GlobalDESOLimit": (price * 1.25) + 1700,
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
    const [failure, setFailure] = useState(false);

    const handleCloseSuccess = () => {
        setAltPayment(false);
        setEnoughFunds(false);
        setSuccess(false);
    }

    const handleOnSuccess = () => {
        setAltPayment(false);
        setSuccess(true);
        setEnoughFunds(false);
    }

    const handleOnFailure = () => {
        setAltPayment(false);
        setFailure(true);
        setEnoughFunds(false);
    }

    const handleCloseFailure = () => {
        setAltPayment(false);
        setFailure(false);
        setEnoughFunds(false);
    }
    useEffect(() => {
        if (!booksLoaded) {
            setLoading(true);
            //loading books
            const fetchData = async () => {
                const response = await fetch('https://api.spatiumstories.xyz/api/marketplace');
                // const response = await fetch('http://0.0.0.0:4201/api/marketplace');
                const books = await response.json();
                let data = [];
                Object.values(books['mod_books']).map((book) => {
                    var newBook = {
                        cover: book['covers'],
                        body: book['body'],
                        author: book['author'],
                        publisher: book['publisher'],
                        publisher_key: book['publisher_key'],
                        title: book['title'],
                        subtitle: book['subtitle'],
                        description: book['description'],
                        type: book['book_type'],
                        postHashHex: book['post_hash_hex'],
                        price: book['price'],
                        total: 1,
                        left: 0
                    };
                    data.push(newBook);
                });
                Object.values(books['rare_books']).map((book) => {
                    console.log(book);
                    var newBook = {
                        cover: book['covers'],
                        body: book['body'],
                        author: book['author'],
                        publisher: book['publisher'],
                        publisher_key: book['publisher_key'],
                        title: book['title'],
                        subtitle: book['subtitle'],
                        description: book['description'],
                        type: book['book_type'],
                        postHashHex: book['post_hash_hex'],
                        price: book['price'],
                        total: book['total'],
                        left: book['left'] ? Object.entries(book['left']) : 0
                    };
                    data.push(newBook);
                });
                setBooks(paginateList(data));
                setBooksLoaded(true);
                setLoading(false);
            };
            fetchData().catch(console.error);

        }
    }, []);

    const paginateList = (list) => {
        list.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
        let data = new Map();
        let i = 0;
        let pageNum = 1;
        list.map((book) => {
            i += 1;
            if (data.get(pageNum) === undefined) {
                data.set(pageNum, [book]);
            } else {
                data.set(pageNum, [...data.get(pageNum), book]);
            }
            if (i === BOOKS_PER_PAGE) {
                pageNum += 1;
                i = 0;
            }
        });
        return data;
    }
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
            <Stack spacing={1} alignItems="center" justifyContent="center" sx={{paddingTop: '50px'}}>
                <Typography variant="h6">Show prices in:</Typography>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{paddingTop: '5px'}}>
                    <Typography align="center">DESO</Typography>
                    <Switch onChange={handleSwitchCurrency} color="secondary" />
                    <Typography align="center">USD</Typography>
                </Stack>
            </Stack>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="lg">
            <Success open={success} handleClose={handleCloseSuccess} message="Thank you for your purchase! Happy reading!"/>
            <Failure open={failure} handleClose={handleCloseFailure} message="Uh oh...could not process payment"/>
            <Stack
                alignItems="center"
                spacing={2}
                sx={{paddingTop:'50px'}}
            >
                <CheckoutModal enoughFunds={enoughFunds} buyer={derivedKeyData} altPayment={altPayment} setAltPayment={handleUseAltPayment} bookToBuy={bookToBuy} open={open} handleClose={handleClose} handleOnFailure={handleOnFailure} handleOnSuccess={handleOnSuccess}/>
            </Stack>
            <Grid container spacing={4}>
                {!booksLoaded &&
                cards.map((card) => (
                    <Book loading={true} card={card}/>
                ))}
                {booksLoaded && books.size > 0 &&
                    Object.values(books.get(page)).map((book) => {
                        return <Book showDesoPrice={!currencyDeso} exchangeRate={exchangeRate} onBuy={handleOpen} loading={false} bookData={book} marketplace={true}/>;
                    })
                }
                {booksLoaded && books.size === 0 &&
                    <Grid item xs={12}>
                        <NoBooks linkToMarketplace={false} message="Coming Soon!!"/>
                    </Grid>
                }
            </Grid>
            <Stack sx={{marginTop: '20px', alignItems: 'center', justifyItems: 'center'}} spacing={2}>
                <Pagination page={page} onChange={handlePageChange} count={books.size} color="primary" />
            </Stack>
            </Container>
        </React.Fragment>
    );
};

export default Marketplace;