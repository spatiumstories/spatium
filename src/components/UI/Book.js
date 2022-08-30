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
    const loading = props.loading;
    const marketplace = props.marketplace;



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
                    loading ? null : (
                        <IconButton aria-label="settings">
                        <MoreVertIcon />
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
                        image={props.bookData.cover}
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
                            by {props.bookData.author}
                            </Typography>
                            <Typography>
                            {props.bookData.description}
                            </Typography>
                        </CardContent>
                        {marketplace ? (
                            <CardActions>
                                <Button size="small">Buy</Button>
                                <Button size="small">More</Button>
                            </CardActions>
                        ) : (
                            <CardActions>
                                <Button size="small">Read</Button>
                                <Button size="small">More</Button>
                            </CardActions>
                        )}
                    </React.Fragment>
                )}
            </Card>
        </Grid>
    );
};

export default Book;