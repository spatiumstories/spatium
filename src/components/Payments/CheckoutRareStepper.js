import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import CheckoutRareForm from './CheckoutRareForm';
import CheckoutRare from './CheckoutRare';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Avatar from '@mui/material/Avatar';
import NotEnoughFunds from './NotEnoughFunds';
import Book from '../UI/Book';
import { useState } from 'react';



const normSteps = ['Serial Number', 'Review your order', 'Showcase Book'];
const notEnoughFunds = ['Checking Wallet'];



const theme = createTheme();

const CheckoutRareStepper = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [serial, setSerial] = useState(null);
  const [steps, setSteps] = useState(normSteps);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <CheckoutRareForm setSerial={handleSerialChange} serialNumbers={props.bookData.left.sort(function(a, b){return a-b})}/>;
      case 1:
        return <CheckoutRare enoughFunds={props.enoughFunds} handleNotEnoughFunds={handleNotEnoughFunds} buyer={props.buyer} serial={serial} showSerial={true} bookData={props.bookData} handleOnSuccess={props.handleOnSuccess} handleOnFailure={handleOnFailure} close={handleNext}/>;
      case 2:
        return <NotEnoughFunds buyer={props.buyer} bookData={props.bookData}/>
      case 3:
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
    setActiveStep(2);
    setSteps(notEnoughFunds);
  }
  
  const handleNext = () => {
    if (activeStep === 1) {
      setActiveStep(3);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      setSerial(null);
    }
    setActiveStep(activeStep - 1);
  };

  const handleSerialChange = (event) => {
    setSerial(event.target.value);
  };

  return (
    <Box
    sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    }}
>        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
          <React.Fragment>
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && activeStep !== 3 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {activeStep === 0 && serial !== null && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>)}
                  {activeStep === 0 && serial === null && (
                  <Button
                    variant="contained"
                    disabled
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>)}
                  {activeStep === 3 && (
                    <Button onClick={props.close} sx={{ mt: 3, ml: 1 }}>
                      Close
                    </Button>
                  )}
                </Box>
              </React.Fragment>
          </React.Fragment>
      </Box>
  );
};

export default CheckoutRareStepper;