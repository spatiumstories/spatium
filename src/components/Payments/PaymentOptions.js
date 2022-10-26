import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import btc from '../../assets/BTC.png';
import sol from '../../assets/SOL.png';
import dusd from '../../assets/DUSD.png';
import eth from '../../assets/ETH.png';
import usdc from '../../assets/USDC.png';
import { useState } from 'react';

const PaymentOptions = (props) => {
    let currencies = ['USDC', 'DUSD', 'BTC', 'ETH', 'SOL']
    const [currency, setCurrency] = useState('');

    const handleOnChange = (event) => {
      props.setCurrency(event);
      setCurrency(event.target.value);
    }
    const getCurrencyImage = (currency) => {
      return (
        <Box
        component="img"
        sx={{
          height: 30,
          width: 30,
          maxHeight: { xs: 20, md: 30 },
          maxWidth: { xs: 20, md: 30 },
        }}
        src={currency}
      />
      );
    }

    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Choose Your Payment Option
        </Typography>
        <Box sx={{ minWidth: {xs: 200, md: 400} }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
           <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            label="Choose Currency"
            onChange={handleOnChange}
          >
            <MenuItem value={'USDC'}>{getCurrencyImage(usdc)}<Typography variant="p" sx={{paddingLeft: '5px'}}>USDC</Typography></MenuItem>
            <MenuItem value={'BTC'}>{getCurrencyImage(btc)}<Typography variant="p" sx={{paddingLeft: '5px'}}>BTC</Typography></MenuItem>
            <MenuItem value={'SOL'}>{getCurrencyImage(sol)}<Typography variant="p" sx={{paddingLeft: '5px'}}>SOL</Typography></MenuItem>
            <MenuItem value={'DUSD'}>{getCurrencyImage(dusd)}<Typography variant="p" sx={{paddingLeft: '5px'}}>DUSD</Typography></MenuItem>
            <MenuItem value={'ETH'}>{getCurrencyImage(eth)}<Typography variant="p" sx={{paddingLeft: '5px'}}>ETH</Typography></MenuItem>
          </Select>
          </FormControl>

        </Box>
        <Typography variant="p" sx={{paddingTop: '15px'}}>
          Once you move to the next screen, you'll have 5 minutes to complete your payment.
        </Typography>
      </React.Fragment>    );
}
export default PaymentOptions;