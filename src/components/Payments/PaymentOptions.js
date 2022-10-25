import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';

const PaymentOptions = (props) => {
    let currencies = ['USDC', 'DUSD', 'BTC', 'ETH', 'SOL']
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Choose Your Payment Option
        </Typography>
        <Grid container spacing={3} sx={{paddingTop: '30px'}}>
          <Grid item xs={12} justifyItems="center" sx={{height: '200px', overflow:'scroll'}}>
          <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
          >
              {currencies.map(currency => (
                  <FormControlLabel key={currency} value={currency} control={<Radio onChange={props.setCurrency}/>} label={currency} />
              ))}
          </RadioGroup>
          </Grid>
        </Grid>
      </React.Fragment>    );
}
export default PaymentOptions;