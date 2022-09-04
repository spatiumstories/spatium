import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../Layout/Copyright';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { makeStyles } from '@mui/styles';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import SignupForm from './SignupForm';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(8, 0, 6),
        align: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

// const url = process.env.PUBLIC_MAILCHIMP_URL;
// console.log(url);
// const url = "https://spatiumstories.us18.list-manage.com/subscribe/post?u=dd45aac160864ee8044643981&amp;id=1455670363&amp;f_id=005710e7f0";
const url = "https://spatiumstories.us18.list-manage.com/subscribe/post?u=dd45aac160864ee8044643981&amp;id=1455670363&amp;f_id=005710e7f0";

const Signup = () => {


    return (
        <Grid container component="main">
            <Grid item xs={12} sm={8} md={7} square>
                <Typography variant="h2" sx={{
                    paddingTop: '20px',
                    paddingBottom: '20px'
                }}>
                    Subscribe to our newsletter!
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={5} sx={{
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], 
            }}>
                <SignupForm/>
            </Grid>
        </Grid>
    );
};

export default Signup;