import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import press from '../../assets/hour.png';
import { useState } from 'react';
import ImportantModal from '../UI/ImportantModal';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';



const confirmText = "You sure you want to make these changes?";

const EditBookConfirm = (props) => {
    const [confirm, setConfirm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [edited, setEdited] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => state.user);


    const handleMarketplace = () => {
        navigate('/marketplace');
    }

    const handleConfirmOpen = () => {
        setConfirm(true);
    }

    const handleConfirmClose = () => {
        setConfirm(false);
    }

    const handleEditing = () => {
        setEditing(true);
    }


    const getPrice = (currency, amount) => {
        if (currency === "deso") {
            return Math.round((amount * 1e9));
        }
        let amountInCents = amount * 100;
        let amountInDeso = amountInCents / (props.exchangeRate === null ? 1 : props.exchangeRate);
        return Math.round((amountInDeso * 1e9));
    }


    
    return (
        <React.Fragment>
            {!editing && !edited ? (
                <React.Fragment>
            <Stack alignItems="center" justifyItems="center" spacing={2}>
                <Typography variant="h4" gutterBottom>
                    Absolutely sure you're ready?
                </Typography>
                <img width="100%" height="100%" src={press}/>
                <Button onClick={handleConfirmOpen} variant="contained" component="label">
                    Edit My Book!
                </Button>
            </Stack>
        </React.Fragment>
            ): editing ?
            (
                <Stack alignItems="center" justifyItems="center" spacing={2}>
                    <Typography variant="h6">Making your NFT Book Changes!</Typography>
                    <Typography variant="p" align="center" sx={{paddingTop: '10px', paddingBottom: '10px'}}>This will take a second. Please be patient :)</Typography>
                    <CircularProgress color="success" />
                </Stack>            
            ) : (
                <Stack alignItems="center" justifyItems="center" spacing={2}>
                    <Typography variant="h6">Congratulations!!!</Typography>
                    <Typography variant="p" align="center" sx={{paddingTop: '10px', paddingBottom: '10px'}}>Your book has been published!! Check it out on the marketplace!</Typography>
                    <Button onClick={handleMarketplace} variant="contained" component="label">
                        Marketplace
                    </Button>
                    <iframe src="https://giphy.com/embed/IwAZ6dvvvaTtdI8SD5" width="480" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/theoffice-the-office-tv-michaels-birthday-IwAZ6dvvvaTtdI8SD5">via GIPHY</a></p>
                </Stack>
            )
        
        
        }
        <ImportantModal title={"Last Check!"} open={confirm} cancel={handleConfirmClose} publish={handleEditing}>
            <Typography>{confirmText}</Typography>
            <Typography sx={{padddingTop: '5px'}}>By clicking Edit, you are agreeing to our <a href="https://diamondapp.com/u/Spatium/blog/spatium-stories-author-terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a></Typography>
        </ImportantModal>
      </React.Fragment>
    );
};

export default EditBookConfirm;