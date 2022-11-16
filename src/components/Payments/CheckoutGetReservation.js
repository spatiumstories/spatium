import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Deso from 'deso-protocol';
import QRCode from 'react-qr-code';
import Timer from '../UI/Timer';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const CheckoutGetReservation = (props) => {
    const user = useSelector(state => state.user);

    useEffect(() => {
        let uri = `/default/rareMint?username=${user.userName}`;
        fetch(uri)
            .then(response => response.text())
            .then(data => {
                let json = JSON.parse(data);
                props.setBook(json['serial'], json['post_hash_hex']);
            })

    }, []);
    return (
        <React.Fragment>
            <Typography variant="h6">Getting Reservation!</Typography>
            <Typography variant="p" sx={{paddingTop: '10px', paddingBottom: '10px'}}>Please be patient...</Typography>
            <CircularProgress color="success" />
        </React.Fragment>
    );
};

export default CheckoutGetReservation;