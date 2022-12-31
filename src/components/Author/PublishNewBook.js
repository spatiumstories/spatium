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
import Review from './Review';
import FinalConfirm from './FinalConfirm';
import NewBookForm from './NewBookForm';
import RoyaltiesForm from './RoyaltiesForm';
import { Stack } from '@mui/system';
import Book from '../UI/Book';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Deso from 'deso-protocol';

const steps = ['Book Details', 'Royalties, Genre, Extra Details', 'Review your Book', 'Confirmation'];


const theme = createTheme();

const PublishNewBook = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [newBook, setNewBook] = useState(null);
  const [newDetails, setNewDetails] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
        let deso = new Deso();
        const exchangeRate = await deso.metaData.getExchangeRate();
        setExchangeRate(exchangeRate['USDCentsPerDeSoExchangeRate']);
    }

    getExchangeRate();
  }, []);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleBookChange = (book) => {
      setNewBook(book);
  }

  const handleDetailsChange = (details) => {
      setNewDetails(details);
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <NewBookForm book={newBook} handleBookChange={handleBookChange} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} steps={steps}/>;
      case 1:
          return <RoyaltiesForm details={newDetails} handleDetailsChange={handleDetailsChange} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} steps={steps}/>;
      case 2:
        return <Review exchangeRate={exchangeRate} book={newBook} details={newDetails} handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} steps={steps}/>;
      case 3:
        return <FinalConfirm exchangeRate={exchangeRate} book={newBook} details={newDetails} handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} steps={steps}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Publish Your Book!
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Stack sx={{
                width: {xs: '100%', sm: '50%'},
                height: {xs: '50%', sm: '25%'}
            }}>
                <Typography sx={{paddingBottom: '10px'}} variant="h5">Congrats! Your Book is Published!</Typography>
                <Book loading={false} bookData={props.bookData} marketplace={false}/>
            </Stack>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Publish Book' : 'Next'}
                </Button>
              </Box> */}
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default PublishNewBook;