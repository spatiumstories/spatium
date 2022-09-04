import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../Layout/Copyright';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import { useState, useRef } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { makeStyles } from '@mui/styles';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const SignupForm = ({ status, message, onValidated }) => {
    const [subscribed, setSubscribed] = useState(false);
    const email = useRef();
    const API_KEY = "5bSu3VcP3yISoDd5Q1lOAA";

    const handleSubscribe = async () => {
        console.log(email.current.value);
        setSubscribed(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                api_key: API_KEY,
                email: email.current.value
            })
        };
        const response = await fetch('https://api.convertkit.com/v3/forms/3576304/subscribe', requestOptions);
        console.log(response);
    }
    return (
        <iframe src="https://spatiumstories.substack.com/embed" width="100%" height="100%" sx={{border:"1px solid #EEE", background:"white"}} frameborder="0" scrolling="no"></iframe>
        // <Grid container justifyContent="center" alignContent="center" sx={{
        //     height: "100%",
        //     padding: {xs: '20px', sm: '0px'}
        // }}>
        //     {!subscribed &&
        //     <Grid item>
        //     <TextField inputRef={email} variant="outlined" label="Email" />
        //     </Grid>}

        //     <Grid item style={{ display: "flex"}}>
        //     {!subscribed && 
        //     <Button onClick={handleSubscribe} color="secondary" variant="contained">
        //         Subscribe
        //     </Button>}
        //     {subscribed && 
        //         <React.Fragment>
        //         <CheckCircleIcon fontSize="large"/>
        //         </React.Fragment>
        //     }
        //     </Grid>
        // </Grid>
    );
};

export default SignupForm;