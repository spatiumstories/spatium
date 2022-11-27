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


import React from 'react';

const Marketplace = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState(new Map());
    const [bookToBuy, setBookToBuy] = useState({type: 'none'});
    const [booksLoaded, setBooksLoaded] = useState(false);
    const deso = new Deso();
    const [open, setOpen] = useState(false);
    const [altPayment, setAltPayment] = useState(false);
    const [derivedKeyData, setDerivedKeyData] = useState(null);
    const BOOKS_PER_PAGE = 6;

    const handlePageChange = (e, p) => {
        setPage(p);
        console.log(p);
    }

    const handleUseAltPayment = (useAltPayment) => {
      setAltPayment(useAltPayment);
    }

    const handleOpen = async (bookData) => {
        getDerivedKey(bookData);
        setBookToBuy(bookData);
        setOpen(true);
    }

    const getDerivedKey = async (bookData) => {
        const request = {
            "publicKey": "",
            "transactionSpendingLimitResponse": {
              "GlobalDESOLimit": (bookData.price * 1.25) + 1700,
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
        });
        return response;
    }
    const handleClose = () => {
        setOpen(false);
        setAltPayment(false);
    }
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    const handleCloseSuccess = () => {
        setAltPayment(false);
        setSuccess(false);
    }

    const handleOnSuccess = () => {
        setAltPayment(false);
        setSuccess(true);
    }

    const handleOnFailure = () => {
        setAltPayment(false);
        setFailure(true);
    }

    const handleCloseFailure = () => {
        setAltPayment(false);
        setFailure(false);
    }

    useEffect(() => {
        if (!booksLoaded) {
            setLoading(true);
            //loading books
            const fetchData = async () => {
                const request = {
                    "UserPublicKeyBase58Check": "BC1YLjC6xgSaoesmZmBgAWFxuxVTAaaAySQbiuSnCfb5eBBiWs4QgfP"
                };
                const response = await deso.nft.getNftsForUser(request);
                let data = [];

                Object.values(response['data']['NFTsMap']).map((book) => {
                    let postHashHex = book['PostEntryResponse']['PostHashHex'];
                    let price = book['NFTEntryResponses']['0']['MinBidAmountNanos'];
                    let author = "Spatium Publisher";
                    let publisher = "SpatiumPublisher";
                    let publisher_key = "BC1YLg9piUDwrwTZfRipfXNq3hW3RZHW3fJZ7soDNNNnftcqrJvyrbq";
                    let description = book['PostEntryResponse']['Body'];
                    let title = "A Spatium Story";
                    let type = "MOD"; //Spatium Publisher public key
                    let bookID = null;
                    let total = null;
                    let left = [];

                    if (book['PostEntryResponse']['PostExtraData']['published_by_key'] != null) {
                        publisher_key = book['PostEntryResponse']['PostExtraData']['published_by_key'];
                    }
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
                        total = book['PostEntryResponse']['NumNFTCopies'];
                        let booksLeft = [];
                        book['NFTEntryResponses'].forEach(function (item, index) {
                            if (item['OwnerPublicKeyBase58Check'] === 'BC1YLjC6xgSaoesmZmBgAWFxuxVTAaaAySQbiuSnCfb5eBBiWs4QgfP' &&
                                item['IsForSale']) {
                                    booksLeft.push(item['SerialNumber']);
                                }
                        });
                        left = booksLeft;
                    }
                    if (bookID !== null) {
                        var newBook = {
                            cover: [book['PostEntryResponse']['ImageURLs'][0]],
                            body: book['PostEntryResponse']['Body'],
                            author: author,
                            publisher: publisher,
                            publisher_key: publisher_key,
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
            </Box>
            <Container sx={{ py: 8 }} maxWidth="lg">
            <Success open={success} handleClose={handleCloseSuccess} message="Thank you for your purchase! Happy reading!"/>
            <Failure open={failure} handleClose={handleCloseFailure} message="Uh oh...could not process payment"/>
            <Stack
                alignItems="center"
                spacing={2}
                sx={{paddingTop:'50px'}}
            >
                <CheckoutModal buyer={derivedKeyData} altPayment={altPayment} setAltPayment={handleUseAltPayment} bookToBuy={bookToBuy} open={open} handleClose={handleClose} handleOnFailure={handleOnFailure} handleOnSuccess={handleOnSuccess}/>
            </Stack>
            <Grid container spacing={4}>
                {!booksLoaded &&
                cards.map((card) => (
                    <Book loading={true} card={card}/>
                ))}
                {booksLoaded && books.size > 0 &&
                    Object.values(books.get(page)).map((book) => {
                        return <Book onBuy={handleOpen} loading={false} bookData={book} marketplace={true}/>;
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