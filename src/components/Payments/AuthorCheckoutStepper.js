import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import CheckoutRare from './CheckoutRare';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import CheckoutGetReservation from './CheckoutGetReservation';
import Book from '../UI/Book';
import Deso from 'deso-protocol';
import { Stack } from '@mui/system';
import AuthorQRCodePayment from './AuthorQRCodePayment';
import PaymentOptions from './PaymentOptions';
import NotEnoughFunds from './NotEnoughFunds';
import AuthorCheckout from './AuthorCheckout';



const normSteps = ['Review your order', 'Thank You!'];
const altSteps = ['Review your order', 'Alt Payment Option', 'QR Code', 'Thank You!'];
const notEnoughFunds = ['Checking Wallet'];


const theme = createTheme();

const AuthorCheckoutStepper = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [bookBought, setBookBought] = useState({});
  const [currency, setCurrency] = useState(null);
  const [timesUp, setTimesUp] = useState(false);
  const [steps, setSteps] = useState(normSteps);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AuthorCheckout enoughFunds={props.enoughFunds} buyer={props.buyer} handleNotEnoughFunds={handleNotEnoughFunds} handleAltPayment={handleAltPayment} nftToBuy={props.nftToBuy} handleOnFailure={handleOnFailure} closeFail={props.close} handleOnSuccess={props.handleOnSuccess} close={handleNext}/>;
      case 1:
        return <NotEnoughFunds buyer={props.buyer} bookData={props.bookData}/>
      case 2:
        return <PaymentOptions setCurrency={handleCurrencyChange}/>;
      case 3:
        return <AuthorQRCodePayment buyer={props.buyer} handleTimesUp={handleTimesUp} currency={currency} nftToBuy={props.nftToBuy} handleOnSuccess={props.handleOnSuccess} close={handleNext}/>;
      case 4:
        return (
          <Stack sx={{
              width: {xs: '100%', sm: '50%'},
              height: {xs: '50%', sm: '25%'}
            }}>
            <Typography sx={{paddingBottom: '10px'}} variant="h5">Here is your book! Enjoy!</Typography>
            <Book loading={false} bookData={props.bookData} marketplace={false}/>
          </Stack>
        );
      default:
        throw new Error('Unknown step');
    }
  }

  const handleOnFailure = () => {
    props.handleOnFailure();
    props.close();
  }

  const handleNotEnoughFunds = () => {
    setActiveStep(1);
    setSteps(notEnoughFunds);
  }

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleAltPayment = () => {
    setSteps(altSteps);
    setActiveStep(2);
  }

  const handleTimesUp = () => {
    setTimesUp(true);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(4);
    } else {
      setActiveStep((currStep) => currStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 3) {
      setCurrency(null);
    }
    if (activeStep === 2 || activeStep === 1) {
      setSteps(normSteps);
    }
    if (activeStep === 2) {
      setActiveStep(0);
    } else {
      setActiveStep((currStep) => currStep - 1);
    }
  };

  return (
    <Box
    sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    }}
>        {activeStep !== 1 && <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <ShoppingCartTwoToneIcon />
            </Avatar>}
          {activeStep !== 1 && <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>}
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && activeStep !== 4 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {activeStep === 4 && (
                    <Button onClick={props.close} sx={{ mt: 3, ml: 1 }}>
                      Close
                    </Button>
                  )}
                  {activeStep === 2 && currency !== null && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>)}
                  {activeStep === 2 && currency === null && (
                  <Button
                    variant="contained"
                    disabled
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>)}
                </Box>
              </React.Fragment>
          </React.Fragment>
      </Box>
  );
};

export default AuthorCheckoutStepper;