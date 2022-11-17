import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const CheckoutRareForm = (props) => {
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
                <FormControlLabel key={serial} value={serial} control={<Radio onChange={props.setSerial}/>} label={serial} />
            ))}
        </RadioGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CheckoutRareForm;