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

const EditBookForm = (props) => {
    const [err, setErr] = useState({
        price: false,
        pegged: false,
        forSale: false,
    });

    const [currBook, setCurrBook] = useState({
        price: "",
        pegged: "",
        forSale: "",
    });

    const validateInput = () => {
        let errCheck = {
            price: false,
            pegged: false,
            forSale: false,
        };
        let valid = true;
        if (currBook.price === "") {
            errCheck.price = true;
            valid = false;
        }

        if (currBook.pegged === "") {
            errCheck.pegged = true;
            valid = false;
        }
        if (currBook.forSale === "") {
            errCheck.forSale = true;
            valid = false;
        }

        if (valid) {
            props.handleBookChange(currBook);
            props.handleNext();
        } else {
            setErr(errCheck);
        }
    }
    useEffect(() => {
        if (props.bookData !== null) {
            setCurrBook(props.bookData);
        }
    }, []);

    const handlePriceChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                price: false,
            }
        });
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                price: event.target.value,
            };
        });
    }

    const handlePeggedChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                pegged: false,
            }
        });
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                pegged: event.target.value,
            };
        });
    }


    const handleForSaleChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                forSale: false,
            }
        });        
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                forSale: event.target.value,
            };
        });
    }

    return (
        <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">{props.showDesoPrice ? '$DESO' : '$'}</InputAdornment>}
                label="Amount"
                value={currBook.amount}
                onChange={handlePriceChange}
                error={err.amount}
                type="number"
            />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={0.25} alignItems="center" justifyContent="center">
                {currBook.pegged && <Switch defaultChecked onChange={handlePeggedChange} color="secondary" />}
                {!currBook.pegged && <Switch onChange={handlePeggedChange} color="secondary" />}
                <Typography align="center">Peg to this Price?</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={0.25} alignItems="center" justifyContent="center">
                {currBook.forSale && <Switch defaultChecked onChange={handleForSaleChange} color="secondary" />}
                {!currBook.forSale && <Switch onChange={handleForSaleChange} color="secondary" />}
                <Typography align="center">Set For Sale</Typography>
            </Stack>
          </Grid>
        </Grid>

      </React.Fragment>
    );
};

export default EditBookForm;