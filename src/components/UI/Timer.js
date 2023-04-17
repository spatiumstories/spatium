import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useRef } from 'react';

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
    const runTimer = useRef(true);


    useEffect(() => {
        setEndTime(Date.now() + TIME);
    }, []);

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());
    }, [endTime]);

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);  
    }, [timeLeft]);



    const formatSeconds = (seconds) => {
        if (seconds >= 10) {
            return seconds;
        } else {
            return "0" + seconds.toString();
        }
    }

    return (
        <React.Fragment>
            {timeLeft !== null && endTime !== null && <Typography variant="h6">{timeLeft.minutes}:{formatSeconds(timeLeft.seconds)}</Typography>}
        </React.Fragment>
    );
};

export default Timer;