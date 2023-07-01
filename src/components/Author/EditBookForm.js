import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import BookIcon from '@mui/icons-material/Book';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InformationModal from '../UI/InformationModal';
import HelpIcon from '@mui/icons-material/Help';

const peggedText = "Pegging your price means the price of your book will be pegged to the $USD value, rather than the $DESO value. This helps ensure your book price stays consistant rather than volatile with the price of $DESO."
const forSaleText = "For now, you can only adjust whether a RARE book is set for sale or not. If you want to remove a MOD book from sale, please message @Spatium directly on any Deso app."
const EditBookForm = (props) => {
    const [peggedOpen, setPeggedOpen] = useState(false);
    const [forSaleOpen, setForSaleOpen] = useState(false);


    const handleForSaleClose = () => {
        setForSaleOpen(false);
    }
    const handleForSaleOpen = () => {
        setForSaleOpen(true);
    }

    const handlePeggedClose = () => {
        setPeggedOpen(false);
    }

    const handlePeggedOpen = () => {
        setPeggedOpen(true);
    }


    const [currBook, setCurrBook] = useState({
        price: "",
        pegged: false,
        forSale: true,
        currency: "usd"
    });

    const handleSwitchPayment = (event) => {
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                currency: event.target.checked ? "deso" : "usd",
            };
        });
    }

    const handlePriceChange = (event) => {
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                price: event.target.value,
            };
        });
    }

    const handlePeggedChange = (event) => {

        setCurrBook(oldBook => {
            return {
                ...oldBook,
                pegged: event.target.checked ? true : false,
            };
        });
    }


    const handleForSaleChange = (event) => {      
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                forSale: event.target.value,
            };
        });
    }

    const handleSubmit = () => {
        props.setDetails(currBook);
        props.handleNext();
    }

    return (
        <React.Fragment>
        <Grid container>
        <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={0.25} alignItems="center" justifyContent="center">
                <Typography align="center">USD</Typography>
                {currBook.currency === "deso" && <Switch defaultChecked onChange={handleSwitchPayment} color="secondary" />}
                {currBook.currency === "usd" && <Switch onChange={handleSwitchPayment} color="secondary" />}
                <Typography align="center">DESO</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">{currBook.currency === 'deso' ? '$DESO' : '$'}</InputAdornment>}
                label="Amount"
                value={currBook.amount}
                onChange={handlePriceChange}
                type="number"
            />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={0.25} alignItems="center" justifyContent="center">
                {currBook.pegged && <Switch defaultChecked onChange={handlePeggedChange} color="secondary" />}
                {!currBook.pegged && <Switch onChange={handlePeggedChange} color="secondary" />}
                <InputLabel id="minting-type">
                    Peg Price <HelpIcon sx={{cursor: "pointer"}}onClick={handlePeggedOpen}/>
                </InputLabel>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={0.25} alignItems="center" justifyContent="center">
                {props.bookData.type === "RARE" && currBook.forSale && <Switch defaultChecked onChange={handleForSaleChange} color="secondary" />}
                {props.bookData.type === "MOD" && <Switch defaultChecked disabled/>}
                <InputLabel id="minting-type">
                    Set For Sale <HelpIcon sx={{cursor: "pointer"}} onClick={handleForSaleOpen}/>
                </InputLabel>            
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, ml: 1 }}
            >
                Submit
            </Button>
        </Box>
        <InformationModal title={"Pegged Prices"} open={peggedOpen} handleClose={handlePeggedClose}>
            <Typography>{peggedText}</Typography>
        </InformationModal>
        <InformationModal title={"For Sale"} open={forSaleOpen} handleClose={handleForSaleClose}>
            <Typography>{forSaleText}</Typography>
        </InformationModal>

      </React.Fragment>
    );
};

export default EditBookForm;