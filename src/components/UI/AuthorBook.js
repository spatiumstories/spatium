import Grid from '@mui/material/Grid';
import { Card, CardMedia, CardContent, CardActions, Tooltip, Radio, Checkbox } from "@mui/material";
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
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 310,
      transition: "transform 0.15s ease-in-out",
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer'
    },
    cardHovered: {
      transform: "scale3d(1.05, 1.05, 1)"
    },
    rootNoPromo: {
        maxWidth: 310,
        transition: "transform 0.15s ease-in-out",
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    selected: {
        maxWidth: 310,
        transition: "transform 0.15s ease-in-out",
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transform: "scale3d(1.01, 1.01, 1)",
        backgroundColor: "black",
        shadow: "5",
    },
    selectedBackground: {
        backgroundColor: "#89CFF0"
    },
    noBackground: {}
  });

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

      const classes = useStyles();
      const [className, setClassName] = useState(classes.rootNoPromo);
      const [background, setBackground] = useState(classes.noBackground);
      const [state, setState] = useState({
        raised:false,
        shadow:1,
      });

    useEffect (() => {
        if (props.promotion) {
            setClassName(classes.root);
        } else {
            setClassName(classes.rootNoPromo);
        }
    }, [props.promotion])

    const handlePromotionSelection = () => {
        if (props.promotion) {
            if (props.bookData.selected) {
                props.handleSelectionRemove(props.bookData);
            } else {
                props.handleSelectionAdd(props.bookData);
            }
            props.bookData.selected = ~props.bookData.selected;
            handleSelectionChange(true, props.bookData.selected);
        }
    }

    const handleSelectionChange = (promo, sel) => {
        if (promo && sel) {
            setClassName(classes.selected);
            setBackground(classes.selectedBackground);
        } else {
            setClassName(classes.root);
            setBackground(classes.noBackground);
        }
    }

    useEffect(() => {
        if (props.promotion) {
            handleSelectionChange(true, props.bookData.selected);
        } else {
            handleSelectionChange(false, false);
        }
    }, [props.bookData, props.promotion]);

    const handleMouseOver = () => {
        if (props.promotion) {
            setState({ raised: true, shadow: 3 });
        }
    }

    const handleMouseLeave = () => {
        if (props.promotion) {
            setState({ raised: false, shadow: 1 });
        }
    }

    return (
        <Grid item key={props.card} xs={12} sm={6} md={4}>
            <Card 
                className={className} 
                classes={{root: state.raised ? classes.cardHovered : ""}}
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseLeave} 
                raised={state.raised} zdepth={state.shadow}
                onClick={handlePromotionSelection}
            >
                <CardHeader
                    className={background}
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
                        className={background}
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
                        <CardContent className={background} sx={{ flexGrow: 1 }}>
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
                        <CardActions className={background}>
                            {!props.promotion && <Button onClick={onEdit} size="large" variant="contained">Edit</Button>}
                            {props.promotion && 
                                // <Tooltip title="Add" arrow>
                                // </Tooltip>
                                <Tooltip title="Cannot edit book in an ongoing promotion" placement="bottom">
                                    <span>
                                        <Button disabled onClick={onEdit} size="large" variant="contained">Edit</Button>
                                    </span>
                                </Tooltip>
                            }
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