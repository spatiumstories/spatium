import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const CheckoutRareForm = (props) => {

  const createLabel = (serial) => {
    let price = (serial[1] / 1000000000).toFixed(2);
    let gap = "-";
    return `#${serial[0]}${gap.repeat(10)}${price} Deso`;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Choose Your Serial Number
      </Typography>
      <Grid container spacing={3} sx={{paddingTop: '30px'}}>
        <Grid item xs={12} justifyItems="center" sx={{height: '200px', overflow:'scroll'}}>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
        >
            {props.serialNumbers.map(serial => (
                <FormControlLabel key={serial[0]} value={serial[0]} control={<Radio onChange={props.setSerial}/>} label={createLabel(serial)} />
            ))}
        </RadioGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CheckoutRareForm;