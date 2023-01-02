import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TestBook from '../UI/TestBook';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import TestSpatiumReader from '../Reader/TestSpatiumReader';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';


const Review = (props) => {
    const user = useSelector(state => state.user);
    const [testBook, setTestBook] = useState(false);

    const onReadHandler = (event) => {
        setTestBook(true);
    }

    const onReaderCloseHandler = () => {
        setTestBook(false);
    }
    /**
     * Constructing Book Data
     *  This comes from props.book
     * cover: "",
        file: "",
        title: "",
        subtitle: "",
        description: "",
        currency: "usd",
        amount: "",
        quantity: "",
        type: "mod",
        author: "",
     * This comes from props.details
        royalties: "",
        genre: [],
        forSale: true,
        dragon: true,
        format: "",
        fictionType: "",
        mintingAccount: "spatium",
     */
    const getPrice = (currency, amount) => {
            if (currency === "deso") {
                return amount;
            }
            console.log(amount);
            let amountInCents = amount * 100;
            console.log(amountInCents);
            let amountInDeso = amountInCents / (props.exchangeRate === null ? 1 : props.exchangeRate);
            console.log(props.exchangeRate);
            console.log(amountInDeso);
            return amountInDeso.toFixed(2);
    }


    const bookData = {
        title: props.book.title,
        author: props.book.author,
        publisher: user.userName,
        subtitle: props.book.subtitle,
        description: props.book.description,
        price: getPrice(props.book.currency, props.book.amount),
        type: props.book.type,
        left: props.book.quantity,
        total: props.book.quantity,
        cover: [URL.createObjectURL(props.book.cover)],
        bookFile: URL.createObjectURL(props.book.file)
    }

    return (
        <React.Fragment>
        {testBook === true ? (
            <React.Fragment>
                <TestSpatiumReader book={URL.createObjectURL(props.book.file)}/>
                <Button onClick={onReaderCloseHandler} size="medium" variant="contained">Close</Button>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                Does everything look right?
                </Typography>
                <Typography sx={{p: '15px'}} variant="p" gutterBottom>
                Be sure to click "Test Reader" to make sure it's the correct epub file uploaded.
                </Typography>
                <TestBook bookData={bookData} onRead={onReadHandler}/>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {props.activeStep !== 0 && (
                        <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                        </Button>
                    )}

                    <Button
                        variant="contained"
                        onClick={props.handleNext}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {props.activeStep === props.steps.length - 1 ? 'Publish Book' : 'Looks Good!'}
                    </Button>
                </Box>
            </React.Fragment>
        )}
      </React.Fragment>
    );
};

export default Review;