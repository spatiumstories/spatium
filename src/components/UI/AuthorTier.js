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

const AuthorTier = (props) => {
    const handleOpenCheckout = () => {
        props.handleOpenCheckout({
            yearly: props.yearly,
            ...props.tier,
        });
    }
    return (
        <Grid
        item
        key={props.tier.title}
        xs={12}
        md={4}
      >
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
          <CardHeader
            title={props.tier.title}
            subheader={props.tier.subheader}
            titleTypographyProps={{ align: 'center' }}
            action={props.tier.title === 'Pro' ? <StarIcon /> : null}
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
                ${!props.yearly ? props.tier.price : props.tier.price * 10}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {!props.yearly ? '/mo' : '/yr'}
              </Typography>
            </Box>
            <List>
              {props.tier.description.map((line) => (
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
              <Typography sx={{cursor: 'pointer'}} onClick={props.handleOpen} variant='p'>*Click here for more info on royalties</Typography>
              <Button fullWidth variant={props.tier.buttonVariant} value={props.tier} onClick={handleOpenCheckout}>
                  {props.tier.buttonText}
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Grid>
    );
}

export default AuthorTier;