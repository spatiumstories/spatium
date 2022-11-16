import { Container } from "@mui/system";
import Grid from '@mui/material/Grid';
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Skeleton from '@mui/material/Skeleton';
import * as React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Deso from "deso-protocol";
import mod from '../../assets/mod.png';
import rare from '../../assets/rare.png';


const Book = (props) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [coverIndex, setCoverIndex] = useState(0);
    const loading = props.loading;
    const marketplace = props.marketplace;

    // useEffect(() => {
    //     if (props.bookData.cover !== undefined) {
    //         if (props.bookData.cover.length > 1) {
    //             console.log("hello??");
    //             setTimeout(() => {
    //             setCoverIndex((prevState) => (prevState.coverIndex + 1) % props.bookData.cover.length);
    //             }, 1000);
    //         }
    //     }
    //   }, []);
    useEffect(() => {
        if (props.bookData !== undefined && props.bookData.cover.length > 1) {
            const timerId = setTimeout(() => setCoverIndex(old => (old + 1) % props.bookData.cover.length), 1000);
            return () => clearTimeout(timerId);
        }
    }, [coverIndex]);

    const onBuyHandler = (event) => {
        props.onBuy(props.bookData);
    }

    const onReadHandler = (event) => {
        // window.open(`/reader/`)
        console.log("read");
        console.log(event);
        window.open(`#/read/${props.bookData.postHashHex}`);
    }

    const onSellHandler = (event) => {
        window.open(`https://${user.userName}.nftz.zone/nft/${props.bookData.postHashHex}`, '_blank', 'noopener,noreferrer');
    }

    console.log(props);
    return (
        <Grid item key={props.card} xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardHeader
                    avatar={
                    loading ? (
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    ) : (
                        <Avatar
                        src={props.bookData.type === 'MOD' ? mod : rare}
                        />
                    )
                    }
                    action={
                    loading || props.bookData.type === 'MOD' || !marketplace ? null : (
                        <IconButton aria-label="numLeft">
                            <Typography>{Array.isArray(props.bookData.left) ? props.bookData.left.length : props.bookData.left}/{props.bookData.total}</Typography>
                        </IconButton>
                    )
                    }
                    title={
                    loading ? (
                        <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                        />
                    ) : (
                        <Typography variant="h5">{props.bookData.title}</Typography>
                    )
                    }
                    subheader={
                    loading ? (
                        <Skeleton animation="wave" height={10} width="40%" />
                    ) : (
                        <Typography>by {props.bookData.author}</Typography>
                    )
                    }

                /> 
                {loading ? (
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                ) : (
                    <CardMedia
                        component="img"
                        sx={{
                        // 16:9
                        //   `pt: '56.25%',
                        }}
                        image={props.bookData.cover[coverIndex]}
                        alt="random"
                    />
                )}
                {loading ? (
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }}/>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {props.bookData.title}
                            </Typography>
                            <Typography>
                            Written by {props.bookData.author}
                            </Typography>
                            <Typography sx={{paddingTop: '20px', paddingBottom: '20px'}}>
                            Published by {props.bookData.publisher}
                            </Typography>
                            <Typography>
                            {Array.isArray(props.bookData.description) ? props.bookData.description[coverIndex] : props.bookData.description}
                            </Typography>
                        </CardContent>
                        {marketplace && props.bookData.price > 0 ? (
                            <CardActions>
                                {
                                    (Array.isArray(props.bookData.left) && props.bookData.left.length > 0) || props.bookData.type === 'MOD' ? (
                                        <Button onClick={onBuyHandler} size="large" variant="contained">Buy</Button>

                                    ) : Array.isArray(props.bookData.left) ? (
                                        <Button onClick={onBuyHandler} disabled size="large" variant="contained">Buy</Button>

                                    ): props.bookData.left > 0 ? (
                                        <Button onClick={onBuyHandler} size="large" variant="contained">Buy</Button>

                                    ): (
                                        <Button onClick={onBuyHandler} disabled size="large" variant="contained">Buy</Button>
                                    )
                                }
                                <Typography variant="h5" sx={{paddingLeft: '10px'}}>{(props.bookData.price / 1000000000).toFixed(2)} DeSo</Typography>                            
                            </CardActions>
                        ) : marketplace ? (
                            <CardActions>
                                <Button onClick={onReadHandler} size="large" variant="contained">Read</Button>
                                <Button onClick={onBuyHandler} size="large" variant="outlined">Collect for Free</Button>
                            </CardActions>
                        ) : (
                            <CardActions>
                                <Button onClick={onReadHandler} size="medium" variant="contained">Read</Button>
                                <Button onClick={onSellHandler} size="medium" variant="outlined">Sell on NFTz</Button>
                            </CardActions>
                        )}
                    </React.Fragment>
                )}
            </Card>
        </Grid>
    );
};

export default Book;