import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import Deso from 'deso-protocol';

const NotEnoughFunds = (props) => {

    const total = (props.bookData.price / 1000000000).toFixed(2);
    const balance = (props.buyer.balance / 1000000000).toFixed(2);

    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <WarningTwoToneIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Not Enough Funds :(
            </Typography>
                <Grid container sx={{ paddingTop: '20px', width: '100%'}}>
                    <Grid item xs={6} alignItems='flex-start'>
                        <Typography variant="h6">{props.bookData.title} x1</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">{total} DeSo</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{paddingTop: '10px'}}>
                        <Typography variant="h5">Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5">{total} DeSo</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5">Current Balance: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5">{balance} DeSo</Typography>
                    </Grid>
                </Grid>
        </Box>
    );
};

export default NotEnoughFunds;