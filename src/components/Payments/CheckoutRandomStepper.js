import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckoutRareForm from './CheckoutRareForm';
import CheckoutRare from './CheckoutRare';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import CheckoutGetReservation from './CheckoutGetReservation';
import Book from '../UI/Book';
import Deso from 'deso-protocol';
import { Stack } from '@mui/system';



const steps = ['Get Reservation', 'Review your order', 'Showcase Book'];


const theme = createTheme();

const CheckoutRandomStepper = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [serial, setSerial] = useState(null);
  const [bookBought, setBookBought] = useState({});

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <CheckoutGetReservation setBook={handleBookChange}/>;
      case 1:
        return <CheckoutRare buyer={props.buyer} serial={serial} showSerial={false} bookData={props.bookData} handleOnFailure={props.handleOnFailure} handleOnSuccess={props.handleOnSuccess} close={handleNext}/>;
      case 2:
        return (
          <Stack sx={{
              width: {xs: '100%', sm: '50%'},
              height: {xs: '50%', sm: '25%'}
            }}>
            <Typography sx={{paddingBottom: '10px'}} variant="h5">Here is your book! Enjoy!</Typography>
            <Book loading={false} bookData={bookBought} marketplace={false}/>
          </Stack>
        );
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setSerial(null);
    setActiveStep(activeStep - 1);
  };

  const handleBookChange = (serial, postHashHex) => {
    setSerial(serial);
    props.bookData.postHashHex = postHashHex;
    handleNext();
  };

  React.useEffect(() => {
    const updateBook = async () => {
      const deso = new Deso();
      const request = {
        "PostHashHex": props.bookData.postHashHex
      };
       const response = await deso.posts.getSinglePost(request);
       console.log(response);
       setBookBought({
         ...props.bookData,
         cover: [response['PostFound']['ImageURLs'][0]],
         description: response['PostFound']['PostExtraData']['description'],
       });
      //  props.bookData.cover = [response['PostFound']['ImageURLs'][0]];
      //  console.log(response['PostFound']['PostExtraData']['description']);
      //  props.bookData.description = response['PostFound']['PostExtraData']['description'];
    };

    updateBook();
  }, [serial]);

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
                  {activeStep !== 0 && activeStep !== 2 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {activeStep === 2 && (
                    <Button onClick={props.close} sx={{ mt: 3, ml: 1 }}>
                      Close
                    </Button>
                  )}
                  {activeStep < steps.length - 2 && serial !== null && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>)}
                  {activeStep < steps.length - 2 && serial === null && (
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

export default CheckoutRandomStepper;