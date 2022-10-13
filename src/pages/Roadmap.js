import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import RoadmapItem from '../components/UI/RoadmapItem';
import { Button } from '@mui/material';
import RoadmapModal from '../components/UI/RoadmapModal';
import Success from '../components/UI/Success';
import { useState } from 'react';

const authorToolsData = [
    "Publish Your Book - Q4 2022",
    "Mint on Demand or Rarely Minted Options - Q4 2022",
    "Engagement tools for you and your fans - Q1 2023",
    "Character NFT Creation Tool",
    "Random Book Cover Generation Tool for Rare Mints",
    "Multichain Mints",
    "Audio book generation tools"
];

const decentralizeData = [
    "Move our Dragon encryption to a Solana smart contract - Q4 2022",
    "Dev tools to expand the Spatium Stories ecosystem",
    "A fully decentralized e-reader device",
    "Book Staking",
    
];

const readerData = [
    "Discounts for Spatium coin holders - Q4 2022",
    "Switch to DeSoDollar Payments - Q4 2022",
    "Review system stored on chain - Q1 2023",
    "Reader app on iOS and Android - Q1 2023",
    "Keep track of where you left off - Q1 2023",
    "PrintaMint",
];

const funData = [
    "Character NFTs",
    "Solana NFT Book support",
    "Other chain support",
    "Spatium Originals series",
];

const crazyData = [
    "Expand the payment system",
    "Library App",
    "Partnerships",
    "Writing competitions",
    "Build, build, and launch the first Publisher DAO",
];

const Roadmap = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [success, setSuccess] = useState(false);

    const handleCloseSuccess = () => {
        setSuccess(false);
    }

    const handleOnSuccess = () => {
        setSuccess(true);
    }

    return (
    <React.Fragment>
        <Success open={success} handleClose={handleCloseSuccess} message="Thank you for the request!"/>
        <Stack
            alignItems="center"
            spacing={2}
            sx={{paddingTop:'50px'}}
        >
        <Typography variant="h2">Our Roadmap!</Typography>
        <Typography variant="h4">Do you have any feature requests?</Typography>
        <Typography variant="h5">We'd love to hear them!</Typography>

        <Button onClick={handleOpen} variant="contained">Submit Request</Button>
        <RoadmapModal open={open} handleClose={handleClose} handleOnSuccess={handleOnSuccess}/>
        </Stack>
        <Grid sx={{
            marginTop: '50px',
            marginBottom: '50px',
            paddingLeft: {xs: '0px', sm: '50px'},
            paddingRight: {xs: '0px', sm: '50px'},
        }}
        container spacing={2}>
            <RoadmapItem type="author" title="Author Tools" data={authorToolsData}/>
            <RoadmapItem type="dec" title="Total Decentralization" data={decentralizeData}/>
            <RoadmapItem type="reader" title="More Reader Features" data={readerData}/>
            <RoadmapItem type="fun" title="The Fun Stuff" data={funData}/>
            <RoadmapItem type="crazy" title="The Crazy Stuff" data={crazyData}/>
        </Grid>
        <Stack
            alignItems="center"
            spacing={2}
            sx={{paddingTop:'50px'}}
        >
            <Typography variant="h7" sx={{paddingBottom: '20px', fontStyle: 'italic'}}>Dates proposed may change. Items with no date are TBD.</Typography>
        </Stack>
    </React.Fragment>
    );
};

export default Roadmap;