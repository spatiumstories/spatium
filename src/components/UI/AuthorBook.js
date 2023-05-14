import Grid from '@mui/material/Grid';
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Skeleton from '@mui/material/Skeleton';
import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import mod from '../../assets/mod.png';
import rare from '../../assets/rare.png';


const AuthorBook = (props) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [coverIndex, setCoverIndex] = useState(0);
    const loading = props.loading;
    const marketplace = props.marketplace;


    useEffect(() => {
        if (props.bookData !== undefined && props.bookData.cover.length > 1) {
            const timerId = setTimeout(() => setCoverIndex(old => (old + 1) % props.bookData.cover.length), 1000);
            return () => clearTimeout(timerId);
        }
    }, [coverIndex]);


    const onEdit = () => {
        props.onEdit(props.bookData);
    }

    const convertToUSD = (price) => {
        let amountInCents = price * props.exchangeRate;
        let amount = amountInCents / 100.0;
        return amount;
    }

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
                    loading || props.bookData.type === 'MOD' ? null : (
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
                            maxWidth: '100%',
                            maxHeight: '100%',
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
                            <Typography variant="h6">
                            {Array.isArray(props.bookData.subtitle) ? props.bookData.subtitle[coverIndex] : props.bookData.subtitle}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={onEdit} size="large" variant="contained">Edit</Button>
                            {props.showDesoPrice ? (
                                <Typography variant="h5" sx={{paddingLeft: '10px'}}>{(props.bookData.price / 1000000000).toFixed(2)} DeSo</Typography>                            
                            ) : (
                                <Typography variant="h5" sx={{paddingLeft: '10px'}}>${(convertToUSD(props.bookData.price / 1000000000)).toFixed(2)}</Typography>                            
                            )}
                        </CardActions>
                    </React.Fragment>
                )}
            </Card>
        </Grid>
    );
};

export default AuthorBook;