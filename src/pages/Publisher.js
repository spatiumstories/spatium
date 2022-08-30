import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import image from '../assets/hour.png';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Publisher = () => {
    return (
        <Stack sx={{
            width: '100%',
            alignItems: 'center',
            paddingTop: '20px',
            paddingBottom: '20px'
        }}
        spacing={4}
        >
        <Item>
            <Typography variant="h3">The future of web3 publishing is here!</Typography>
        </Item>
        <Box component="img"src={image} alt="Logo" sx={{
            display: {xs: 'none', md: 'flex'},
            maxWidth: '40%',
        }}/>

        <Item>
            <Typography variant="h3">Well...not quite here yet, but very very soon!</Typography>
        </Item>
        </Stack>
    );
};

export default Publisher;