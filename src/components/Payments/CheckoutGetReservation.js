import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

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