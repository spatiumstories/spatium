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
import CheckoutModal from '../components/Payments/CheckoutModal';
import Success from '../components/UI/Success';
import Failure from "../components/UI/Failure";


import React from 'react';

const MintingNow = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [enoughFunds, setEnoughFunds] = useState(false);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState();
    const [bookToBuy, setBookToBuy] = useState({type: 'none'});
    const [booksLoaded, setBooksLoaded] = useState(false);
    const deso = new Deso();
    const [open, setOpen] = useState(false);
    const [altPayment, setAltPayment] = useState(false);
    const [derivedKeyData, setDerivedKeyData] = useState(null);

    const handleUseAltPayment = (useAltPayment) => {
      setAltPayment(useAltPayment);
    }

    const handleOpen = async (bookData) => {
        await getDerivedKey(bookData);
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
        setSuccess(false);
        setEnoughFunds(false);
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
                let nftMap = [];
                // const nfts = await fetch("/default/getRareMintNow"); //=> local dev
                const nfts = await fetch("https://tkvr4urfac.execute-api.us-east-1.amazonaws.com/default/getRareMintNow"); // => prod
                const nftJSON = await nfts.json();
                for (var i = 0; i < nftJSON.length; i++) {
                    let nft = nftJSON[i];
                    const request = {
                        "PostHashHex": nft
                    };
                    const response = await deso.nft.getNftBidsForNftPost(request);
                    nftMap.push(response['data']);
                }
                // First collect all the 
                let coversMap = new Map();
                let descriptionMap = new Map();
                let subtitleMap = new Map();
                nftMap.map((nft) => {
                    let bookId = nft['PostEntryResponse']['PostExtraData']['book_id'];
                    if (coversMap.has(bookId)) {
                        let arr = coversMap.get(bookId);
                        let newArr = [...arr, nft['PostEntryResponse']['ImageURLs'][0]];
                        coversMap.set(bookId, newArr);
                    } else {
                        coversMap.set(bookId, [nft['PostEntryResponse']['ImageURLs'][0]]);
                    }

                    let desc = nft['PostEntryResponse']['PostExtraData']['description'];
                    if (descriptionMap.has(bookId)) {
                        let arr = descriptionMap.get(bookId);
                        let newArr = [...arr, desc];
                        descriptionMap.set(bookId, newArr);
                    } else {
                        descriptionMap.set(bookId, [desc]);
                    }

                    let subtitle = nft['PostEntryResponse']['PostExtraData']['subtitle'];
                    if (subtitleMap.has(bookId)) {
                        let arr = subtitleMap.get(bookId);
                        let newArr = [...arr, subtitle];
                        subtitleMap.set(bookId, newArr);
                    } else {
                        subtitleMap.set(bookId, [subtitle]);
                    }
                });
                
                let ids = new Map();
                nftMap.map((book) => {
                    let postHashHex = book['PostEntryResponse']['PostHashHex'];
                    let price = book['NFTEntryResponses']['0']['MinBidAmountNanos'];
                    let author = "Spatium Publisher";
                    let publisher = "SpatiumPublisher";
                    let publisher_key = "BC1YLg9piUDwrwTZfRipfXNq3hW3RZHW3fJZ7soDNNNnftcqrJvyrbq";
                    let description = book['PostEntryResponse']['Body'];
                    let title = "A Spatium Story";
                    let subtitle = "";
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
                    if (book['PostEntryResponse']['PostExtraData']['subtitle'] != null) {
                        subtitle = book['PostEntryResponse']['PostExtraData']['subtitle'];
                    }
                    if (book['PostEntryResponse']['PostExtraData']['type'] != null) {
                        type = book['PostEntryResponse']['PostExtraData']['type'];
                    }
                    if (book['PostEntryResponse']['PostExtraData']['book_id'] != null) {
                        bookID = book['PostEntryResponse']['PostExtraData']['book_id'];
                    }

                    if (type === 'RARE') {
                        total = book['PostEntryResponse']['NumNFTCopies'];
                        let booksLeft = 0;
                        book['NFTEntryResponses'].forEach(function (item, index) {
                            if (item['OwnerPublicKeyBase58Check'] === 'BC1YLjC6xgSaoesmZmBgAWFxuxVTAaaAySQbiuSnCfb5eBBiWs4QgfP') {
                                    booksLeft += 1;
                                }
                        });
                        left = booksLeft;
                    }
                    if (bookID !== null) {
                        var newBook = {
                            cover: coversMap.get(book['PostEntryResponse']['PostExtraData']['book_id']),
                            body: book['PostEntryResponse']['Body'],
                            author: author,
                            publisher: publisher,
                            publisher_key: publisher_key,
                            title: title,
                            subtitle: subtitleMap.get(book['PostEntryResponse']['PostExtraData']['book_id']),
                            description: descriptionMap.get(book['PostEntryResponse']['PostExtraData']['book_id']),
                            type: type,
                            postHashHex: postHashHex,
                            price: price,
                            total: total,
                            left: left
                        };
                        if (ids.has(bookID)) {
                            let currBook = ids.get(bookID);
                            newBook.total += currBook.total;
                            newBook.left += currBook.left;
                        }
                        ids.set(bookID, newBook);
                    }
                });
                setBooks(Array.from(ids.values()));
                setBooksLoaded(true);
                setLoading(false);
            };
            fetchData().catch(console.error);

        }
    }, []);

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleMarketplace = () => {
        navigate('/marketplace');
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
                Random RARE's Minting Now!
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                All books here are RARE editions with a randomized minting process. This means if you buy one of these books you will be given a random cover, it could be the rarest one!
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                    <Button onClick={handleMarketplace} variant="contained">Marketplace!</Button>
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
                <CheckoutModal enoughFunds={enoughFunds} buyer={derivedKeyData} altPayment={altPayment} setAltPayment={handleUseAltPayment} bookToBuy={bookToBuy} randomMint={true} open={open} handleClose={handleClose} handleOnFailure={handleOnFailure} handleOnSuccess={handleOnSuccess}/>
            </Stack>
            <Grid container spacing={4}>
                {!booksLoaded &&
                cards.map((card) => (
                    <Book loading={true} card={card}/>
                ))}
                {booksLoaded && books.length > 0 &&
                    Object.values(books).map((book) => {
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

export default MintingNow;