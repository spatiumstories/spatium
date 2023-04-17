import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Deso from 'deso-protocol';

const FinalizeAltPayment = (props) => {
    const user = useSelector(state => state.user);
    const [buying, setBuying] = useState(false);
    const [nft, setNFT] = useState();
    const deso = new Deso();

    const total = (props.bookData.price / 1000000000).toFixed(2);


    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
                <Grid container sx={{ paddingTop: '20px', width: '100%'}}>
                    <Grid item xs={6} alignItems='flex-start'>
                        <Typography variant="h6">{props.bookData.title} x1</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">{total} DeSo</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{paddingTop: '10px'}}>
                        <Typography variant="h5">Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5">{total} DeSo</Typography>
                    </Grid>
                </Grid>
                <Typography sx={{paddingTop: '10px'}} variant="p">By completing your purchase, you agree to our <a href="https://diamondapp.com/u/Spatium/blog/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Use.</a></Typography>

        </Box>
    );
};

export default FinalizeAltPayment;