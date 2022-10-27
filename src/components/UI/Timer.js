import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import Deso from 'deso-protocol';
import QRCode from 'react-qr-code';
import Countdown from 'react-countdown';

const Timer = (props) => {
    const calculateTimeLeft = () => {
        let diff = endTime - Date.now();
        let timeLeft = null;
        if (diff > 0) {
            setTimerStarted(true);
            timeLeft = {
                minutes: Math.floor((diff / 1000 / 60) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            };
        } else if (timerStarted) {
            props.handleTimesUp();
        }
        return timeLeft;
    }

    const TIME = 5 * 60 * 1000;
    const [endTime, setEndTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);

    useEffect(() => {
        setEndTime(Date.now() + TIME);
        setTimeLeft(calculateTimeLeft());
    }, []);

    useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });





    return (
        <React.Fragment>
            {timeLeft !== null && endTime !== null && <Typography variant="h6">{timeLeft.minutes}:{timeLeft.seconds}</Typography>}
        </React.Fragment>
    );
};

export default Timer;