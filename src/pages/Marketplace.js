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


import React from 'react';

const Marketplace = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState();
    const [booksLoaded, setBooksLoaded] = useState(false);
    const deso = new Deso();

    useEffect(() => {
        if (!booksLoaded) {
            setLoading(true);
            //loading books
            const fetchData = async () => {
                const request = {
                    "UserPublicKeyBase58Check": "BC1YLiyXEUuURc9cHYgTnJmT3R9BvMfbQPEgWozofsbzbfFwFbcG7D5"
                };
                const response = await deso.nft.getNftsForUser(request);
                let data = [];
                Object.values(response['data']['NFTsMap']).map((book) => {
                    let author = "SpatiumPublisher";
                    let description = book['PostEntryResponse']['Body'];
                    let title = "A Spatium Story";
                    let type = "MOD"; //Spatium Publisher public key

                    if (book['PostEntryResponse']['PostExtraData']['author'] != null) {
                        author = book['PostEntryResponse']['PostExtraData']['autor'];
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
                    var newBook = {
                        cover: book['PostEntryResponse']['ImageURLs'][0],
                        body: book['PostEntryResponse']['Body'],
                        author: author,
                        title: title,
                        description: description,
                        type: type,
                    };
                    data.push(newBook);
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
                We offer both limited edition and Mint on Demand books!
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
            <Grid container spacing={4}>
                {!booksLoaded &&
                cards.map((card) => (
                    <Book loading={true} card={card}/>
                ))}
                {booksLoaded &&
                    Object.values(books).map((book) => {
                        console.log(book);
                        return <Book loading={false} bookData={book} marketplace={true}/>;
                    })
                }
            </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Marketplace;