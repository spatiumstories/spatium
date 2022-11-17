import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        height: '100vh',
    }
}));



const Intro = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleMarketplace = () => {
        navigate('/marketplace')
    }
    
    const handlePublisher = () => {
        navigate('/publish')
    }
    return (
        <Container maxWidth="sm" className={classes.container}>
                <Typography variant="h1" sx={{
                    paddingBottom: '50px',
                    paddingTop: '50px'
                    }}>Spatium Stories</Typography>
                <Typography variant="h6">A brand new NFT book marketplace.</Typography>
                <Typography variant="h6" sx={{paddingTop: '20px'}}>Decentralized and protected books, social connections on chain, and so much more.</Typography>
                <Typography variant="h6" sx={{
                    paddingTop: '50px'
                }}>Get Started Today!</Typography>
                <Stack direction="row" spacing={2} sx={{
                    paddingTop: '20px'
                }}>
                    <Button onClick={handleMarketplace}variant="contained">Reader?</Button>
                    <Button onClick={handlePublisher} color="secondary" variant="contained">Writer?</Button>
                </Stack>
        </Container>
    );
};

export default React.memo(Intro);