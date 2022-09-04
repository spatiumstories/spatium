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


import React from 'react';

const Bookshelf = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [books, setBooks] = useState();
    const [booksLoaded, setBooksLoaded] = useState(false);
    const deso = new Deso();

    useEffect(() => {
        if (!booksLoaded) {
          //loading books
            const fetchData = async () => {
                const request = {
                    "UserPublicKeyBase58Check": user.publicKey
                };
                const response = await deso.nft.getNftsForUser(request);
                let data = [];
                Object.values(response['data']['NFTsMap']).map((book) => {
                    if (book['PostEntryResponse']['PosterPublicKeyBase58Check'] === "BC1YLjC6xgSaoesmZmBgAWFxuxVTAaaAySQbiuSnCfb5eBBiWs4QgfP") {
                        console.log(book['PostEntryResponse']['PostExtraData']);
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
                    }
                });
                setBooks(data);
                setBooksLoaded(true);
            };
            fetchData().catch(console.error);

        }
    }, [user]);

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handlePublish = () => {
        navigate('/publish');
    }

    const handleMarketplace = () => {
        navigate('/marketplace');
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
                {user.userName}'s Books
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Read all your books directly through Spatium Stories! Get lost today!
                Out of books? Go grab a new one in the marketplace!
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                    <Button onClick={handleMarketplace} variant="contained">Marketplace</Button>
                    <Button onClick={handlePublish} variant="outlined">Publish My Book!</Button>
                </Stack>
            </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4}>
                {!booksLoaded && 
                cards.map((card) => (
                    <Book loading={true} card={card}/>
                ))}
                {booksLoaded && books.length > 0 &&
                    Object.values(books).map((book) => {
                        console.log(book);
                        return <Book loading={false} bookData={book} marketplace={false}/>;
                    })
                }
                {booksLoaded && books.length === 0 &&
                    <Grid item xs={12}>
                        <NoBooks linkToMarketplace={true} message="Go buy your first book now!" handleMarketplace={handleMarketplace}/>
                    </Grid>
                }
            </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Bookshelf;