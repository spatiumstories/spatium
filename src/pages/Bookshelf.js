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
import Pagination from '@mui/material/Pagination';



import React from 'react';

const Bookshelf = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [page, setPage] = useState(1);
    const [books, setBooks] = useState(new Map());
    const [booksLoaded, setBooksLoaded] = useState(false);
    const deso = new Deso();
    const BOOKS_PER_PAGE = 6;

    const handlePageChange = (e, p) => {
        setPage(p);
        console.log(p);
    }

    useEffect(() => {
        if (!booksLoaded) {
          //loading books
            const fetchData = async () => {
                const request = {
                    "UserPublicKeyBase58Check": user.publicKey
                };
                const response = await deso.nft.getNftsForUser(request);
                let data = [];
                console.log(response);
                Object.values(response['NFTsMap']).map((book) => {
                    if (book['PostEntryResponse']['PosterPublicKeyBase58Check'] === "BC1YLjC6xgSaoesmZmBgAWFxuxVTAaaAySQbiuSnCfb5eBBiWs4QgfP") {
                        let postHashHex = book['PostEntryResponse']['PostHashHex'];
                        let author = "Spatium Publisher";
                        let publisher = "SpatiumPublisher";
                        let description = book['PostEntryResponse']['Body'];
                        let title = "A Spatium Story";
                        let subtitle = "";
                        let type = "MOD"; //Spatium Publisher public key

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
                        var newBook = {
                            cover: [book['PostEntryResponse']['ImageURLs'][0]],
                            body: book['PostEntryResponse']['Body'],
                            author: author,
                            publisher: publisher,
                            title: title,
                            subtitle: subtitle,
                            description: description,
                            type: type,
                            postHashHex: postHashHex,
                        };
                        data.push(newBook);
                    }
                });
                setBooks(paginateList(data));
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
                {booksLoaded && books.size > 0 &&
                    Object.values(books.get(page)).map((book) => {
                        console.log(book);
                        return <Book loading={false} bookData={book} marketplace={false}/>;
                    })
                }
                {booksLoaded && books.size === 0 &&
                    <Grid item xs={12}>
                        <NoBooks linkToMarketplace={true} message="Go buy your first book now!" handleMarketplace={handleMarketplace}/>
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

export default Bookshelf;