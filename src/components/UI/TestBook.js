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
import { Link } from 'react-router-dom';
import TestSpatiumReader from '../Reader/TestSpatiumReader';

const TestBook = (props) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [coverIndex, setCoverIndex] = useState(0);

    const onReadHandler = (event) => {
        // localStorage.setItem("testBook", props.bookData.bookFile);
        // const bookWindow = window.open('#/testReader');
        // bookWindow.location.state = {
        //     book: URL.createObjectURL(props.bookData.bookFile),
        // };
        // navigate("/testReader", {
        //     state: {
        //         id: props.bookData.bookFile
        //     }
        // });
    }

    const onNextHandler = () => {
        // localStorage.removeItem("testBook");
    }

    return (
        <Grid item key={props.card} xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardHeader
                    avatar={<Avatar src={props.bookData.type === 'mod' ? mod : rare}/>}
                    action={
                    props.bookData.type === 'mod' ? null : (
                        <IconButton aria-label="numLeft">
                            <Typography>{Array.isArray(props.bookData.left) ? props.bookData.left.length : props.bookData.left}/{props.bookData.total}</Typography>
                        </IconButton>
                    )
                    }
                    title={<Typography variant="h5">{props.bookData.title}</Typography>}
                    subheader={<Typography>by {props.bookData.author}</Typography>}
                /> 
                <CardMedia
                        component="img"
                        sx={{
                        // 16:9
                        //   `pt: '56.25%',
                        }}
                        image={props.bookData.cover[coverIndex]}
                        alt="random"
                    />
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
                            <Typography variant="h6" sx={{paddingBottom: '20px'}}>
                            {Array.isArray(props.bookData.subtitle) ? props.bookData.subtitle[coverIndex] : props.bookData.subtitle}
                            </Typography>
                            <Typography style={{whiteSpace: 'pre-wrap'}}>
                            {Array.isArray(props.bookData.description) ? props.bookData.description[coverIndex] : props.bookData.description}
                            </Typography>
                        </CardContent>
                            <CardActions>
                                <Button onClick={props.onRead} size="medium" variant="contained">Test Reader</Button>
                                <Typography variant="h5" sx={{paddingLeft: '10px'}}>{props.bookData.price} DeSo</Typography>                            
                            </CardActions>
                    </React.Fragment>
            </Card>
        </Grid>
    );
};

export default TestBook;