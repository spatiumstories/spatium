import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import { useState, useEffect } from 'react';
import InformationModal from '../UI/InformationModal';
import RoadmapModal from '../UI/RoadmapModal';
import Deso from "deso-protocol";
import Success from '../UI/Success';
import Failure from "../UI/Failure";
import AuthorCheckoutModal from '../Payments/AuthorCheckoutModal';
import AuthorTier from '../UI/AuthorTier';

const tiers = [
  {
    authorType: 1,
    title: 'Free',
    price: 0,
    description: [
      'Publish 2 books/stories per month',
      '*80% royalties on primary sales',
      'Access to exclusive Spatium author community',
      'Community building tools',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'contained',
  },
  {
    authorType: 2,
    title: 'Authorpreneur',
    // subheader: 'Most popular',
    price: 8,
    description: [
      'Publish 15 books/stories per month',
      '*90% royalties on primary sales',
      'Access to exclusive Spatium author community',
      'Community building tools',
      '1% Spatium profit sharing with other Authorpreneurs',
    ],
    buttonText: 'Buy now',
    buttonVariant: 'contained',
  },
  {
    authorType: 3,
    title: 'Publisher',
    price: 35,
    description: [
        'Publish unlimited books/stories per month',
        '*93% royalties on primary sales',
        'Access to exclusive Spatium author community',
        'Community building tools',
        '1% Spatium profit sharing with other Publishers',
        'Mint under your own account',
        'R2M2 minting option'
    ],
    buttonText: 'Buy now',
    buttonVariant: 'contained',
  },
];


const Pricing = (props) => {
  const deso = new Deso();
  const [yearly, setYearly] = useState(false);
  const [open, setOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(props.authorOpen);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [derivedKeyData, setDerivedKeyData] = useState({});
  const [altPayment, setAltPayment] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [nftToBuy, setNftToBuy] = useState({type: 'none'});
  const [enoughFunds, setEnoughFunds] = useState(false);


  const handleSwitchPayment = (event) => {
    setYearly(event.target.checked);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
      setOpen(true);
  }

  const authorClose = () => {
    setAuthorOpen(false);
  }

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  }

  const handleUseAltPayment = (useAltPayment) => {
    setAltPayment(useAltPayment);
  }

  useEffect(() => {
    const getExchangeRate = async () => {
        let deso = new Deso();
        const exchangeRate = await deso.metaData.getExchangeRate();
        setExchangeRate(exchangeRate['USDCentsPerDeSoExchangeRate']);
    }

    getExchangeRate();
  }, []);

  const handleOpenCheckout = async (nftToBuy) => {
    console.log(nftToBuy);
    let convertedNFT = {
      convertedPrice: convertPrice(nftToBuy.price),
      ...nftToBuy,
    }
    console.log(convertedNFT);
    await getDerivedKey(convertedNFT);
    setNftToBuy(convertedNFT);
    setOpenCheckout(true);
  }

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const handleCloseSuccess = () => {
      setAltPayment(false);
      setEnoughFunds(false);
      setSuccess(false);
  }

  const handleOnSuccess = () => {
      setAltPayment(false);
      setSuccess(true);
      setEnoughFunds(false);
  }

  const handleOnFailure = () => {
      setAltPayment(false);
      setFailure(true);
      setEnoughFunds(false);
  }

  const handleCloseFailure = () => {
      setAltPayment(false);
      setFailure(false);
      setEnoughFunds(false);
  }

  const convertPrice = (price) => {
    let usdPrice = price
    usdPrice = yearly ? usdPrice * 10 : usdPrice;
    usdPrice = usdPrice * 100; // in cents
    let desoToUsdCents =  1 / exchangeRate;
    return Math.round(desoToUsdCents * usdPrice * 1e9);
  }

  const getDerivedKey = async (nftData) => {
    // Get price to approve (if RARE, get highest price for convenience)
    let price = nftData.convertedPrice;
    console.log(price);
    const request = {
        "publicKey": "",
        "transactionSpendingLimitResponse": {
          "GlobalDESOLimit": Math.round(price * 1.25) + 1700,
          "TransactionCountLimitMap": {
            "AUTHORIZE_DERIVED_KEY": 2
          },
          "NFTOperationLimitMap": {
            "": {
              "0": {
                "any": 1
              }
            }
          },
        },
      };
    const response = await deso.identity.derive(request);
    const userRequest = {
        "PublicKeyBase58Check": response['publicKeyBase58Check']
    };
    const user = await deso.user.getSingleProfile(userRequest);
    setDerivedKeyData({
        derivedSeedHex: response['derivedSeedHex'],
        derivedPublicKeyBase58Check: response['derivedPublicKeyBase58Check'],
        accessSignature: response['accessSignature'],
        expirationBlock: response['expirationBlock'],
        transactionSpendingLimitHex: response['transactionSpendingLimitHex'],
        publicKey: response['publicKeyBase58Check'],
        userName: user['Profile']['Username'],
        balance: user['Profile']['DESOBalanceNanos']
    });
    if (user['Profile']['DESOBalanceNanos'] >= Math.round(price * 1.025) + 1700) {
        setEnoughFunds(true);
    }
    return response;
}

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, textAlign: 'left' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
        All these different tiers are our author NFTs. Holding one of these unlocks the
        ability to publish your own books on Spatium Stories.
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{paddingTop: '50px'}}>
            <Typography align="center">Monthly</Typography>
            <Switch onChange={handleSwitchPayment} color="secondary" />
            <Typography align="center">Annually</Typography>
        </Stack>
        <InformationModal title={"Royalties Info"} open={open} handleClose={handleClose}>
            <Typography>Royalties are given differently on primary vs secondary sales. On primary sales you receive at least 80-93% royalties. We take the remainder as a fee. Secondary sales are set differently. You can customize the royalties you want to receive on secondary sales. We have a  constant 5% royalty we take on secondary sales. </Typography>
        </InformationModal>
        <InformationModal title={"You Need an Author NFT"} open={authorOpen} handleClose={authorClose}>
            <Typography>Looks like you don't have one of our author NFTs :/ Here are 3 options for you to look at!</Typography>
        </InformationModal>

      </Container>
      {/* End hero unit */}
      <Container maxWidth="lg" component="main" sx={{paddingBottom: 10}}>
        <Grid container spacing={5}>
        <AuthorCheckoutModal yearly={yearly} enoughFunds={enoughFunds} exchangeRate={exchangeRate} buyer={derivedKeyData} altPayment={altPayment} setAltPayment={handleUseAltPayment} nftToBuy={nftToBuy} open={openCheckout} handleClose={handleCloseCheckout} handleOnFailure={handleOnFailure} handleOnSuccess={handleOnSuccess}/>
        <Success open={success} handleClose={handleCloseSuccess} message="Thank you for your purchase! Welcome to the future of publishing!"/>
        <Failure open={failure} handleClose={handleCloseFailure} message="Uh oh...could not process payment"/>
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <AuthorTier tier={tier} handleOpen={handleOpen} yearly={yearly} handleOpenCheckout={handleOpenCheckout}/>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Pricing;