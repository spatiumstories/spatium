import nobooks from '../../assets/nobooks.png';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Button } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const NoBooks = (props) => {
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
            <Typography variant="h3">No Books Found :/</Typography>
        </Item>
            <Box component="img"src={nobooks} alt="Logo" sx={{
                display: 'center',
                width: {xs: '100%', md: '40%'},
            }}/>

        <Item>
            <Typography variant="h3">{props.message}</Typography>
        </Item>
        {props.linkToMarketplace && <Button onClick={props.handleMarketplace} variant="contained">Marketplace</Button>}
        </Stack>
    );
};

export default NoBooks;