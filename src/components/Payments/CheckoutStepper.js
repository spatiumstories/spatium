import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Avatar from '@mui/material/Avatar';
import QRCodePayment from './QRCodePayment';
import PaymentOptions from './PaymentOptions';
import FinalizeAltPayment from './FinalizeAltPayment';
import LinearProgress from '@mui/material/LinearProgress';

import { useState } from 'react';



const steps = ['Choose Payment Option', 'Review your order', 'QR Code'];


const theme = createTheme();

const CheckoutStepper = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [currency, setCurrency] = useState(null);
  const [timesUp, setTimesUp] = useState(false);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PaymentOptions setCurrency={handleCurrencyChange}/>;
      case 1:
        return <FinalizeAltPayment bookData={props.bookData} handleOnSuccess={props.handleOnSuccess} close={props.close}/>;
      case 2:
        return <QRCodePayment type={"MOD"} buyer={props.buyer} handleTimesUp={handleTimesUp} currency={currency} bookData={props.bookData} handleOnSuccess={props.handleOnSuccess} close={props.close}/>
        default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCurrencyChange = (event) => {
    console.log(event.target.value);
    setCurrency(event.target.value);
  };

  const handleTimesUp = () => {
    setTimesUp(true);
  }

  return (
    <Box
    sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    }}
    >
        {!timesUp && 
        <React.Fragment>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <ShoppingCartTwoToneIcon />
              </Avatar>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </React.Fragment>
        }
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order!
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && !timesUp && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {activeStep < steps.length - 1 && currency !== null ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>) :
                  activeStep < steps.length - 1 && currency === null ? (
                  <Button
                    variant="contained"
                    disabled
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>) : (
                    timesUp &&
                    <Button variant="contained"
                    sx={{ mt: 3, ml: 1}}
                    onClick={props.close}
                    >
                      Ok!
                    </Button>
                  )
                  }
                  {activeStep === steps.length - 1 && (
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
      </Box>
  );
};

export default CheckoutStepper;