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
import { useState } from 'react';
import InformationModal from '../UI/InformationModal';
import RoadmapModal from '../UI/RoadmapModal';

const tiers = [
  {
    title: 'Free',
    price: '0',
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
    title: 'Authorpreneur',
    // subheader: 'Most popular',
    price: '8',
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
    title: 'Publisher',
    price: '35',
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
  const [yearly, setYearly] = useState(false);
  const [open, setOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(props.authorOpen);

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
        ability to publish your own books on Spatium Stories. The Free tier you can only publish
        through the SpatiumPublisher account. Paid tiers unlock many more features including
        publishing from your own personal account or project account, promotional tools, and
        profit sharing.
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
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              md={4}
            >
              <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent sx={{flexGrow: 1}}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${!yearly ? tier.price : tier.price * 10}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {!yearly ? '/mo' : '/yr'}
                    </Typography>
                  </Box>
                  <List>
                    {tier.description.map((line) => (
                      <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <CheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={line}/>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions>
                  <Stack direction="column" spacing={1} alignItems="center" justifyContent="center" sx={{width: '100%', paddingTop: '50px'}}>
                    <Typography sx={{cursor: 'pointer'}} onClick={handleOpen} variant='p'>*Click here for more info on royalties</Typography>

                    <Button disabled fullWidth variant={tier.buttonVariant}>
                        {/* {tier.buttonText} */}
                        Coming Soon!
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Pricing;