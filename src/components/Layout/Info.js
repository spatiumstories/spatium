import Grid from '@mui/material/Grid';
import InfoCard from "./InfoCard";
import React from 'react';

const dragonTitle = "The Dragon";
const dragonDesc = "Your books are protected by the fiercest of beasts. Our sophisticated digital rights management system makes it so while your book is 100% on-chain, the book's IP is still protected. Any invaders will be instantly vaporized.";

const desoTitle = "Built on DeSo";
const desoDesc = "The most important aspect to story telling is community. What better way to introduce a new decentralized book store than with DeSo, an L1 blockchain built from the ground up to scale decentralized social applications."

const mintTitle = "Unique Minting";
const mintDesc = "We offer two ways to mint your book. Mint on Demand, which allows infinite copies of your book to be bought. Or Rare mints for special edition covers, signed copies, or first edition releases! Giving you full control.";

const Info = () => {
    return (
        <Grid rowSpacing={2} justifyContent="space-around" container component="main" sx={{ paddingTop: '30px', paddingBottom: '30px', height: '100%', width: '100%'}}>
            <Grid item xs={12} md={3.75}>
                <InfoCard img="dragon" title={dragonTitle} desc={dragonDesc}/>
            </Grid>
            <Grid item xs={12} md={3.75}>
                <InfoCard img="deso" title={desoTitle} desc={desoDesc}/>
            </Grid>
            <Grid item xs={12} md={3.75}>
                <InfoCard img="mint" title={mintTitle} desc={mintDesc}/>
            </Grid>
        </Grid>
    );
};

export default Info;