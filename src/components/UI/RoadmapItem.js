import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import CurrencyBitcoinTwoToneIcon from '@mui/icons-material/CurrencyBitcoinTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import CelebrationTwoToneIcon from '@mui/icons-material/CelebrationTwoTone';
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import { Card } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  function generate(element) {
      return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
          key: value,
        }),
      );
    }
const RoadmapItem = (props) => {
    const listItems = props.data.map((item) => {
        return (
            <ListItem>
                <ListItemIcon>
                    <CircleTwoToneIcon />
                </ListItemIcon>
                {item.charAt(0) === "*" && <ListItemText sx={{textDecoration: "line-through"}}primary={item.substring(1)}/>}
                {item.charAt(0) !== "*" && <ListItemText primary={item}/>}
            </ListItem>
        );
    });
    return (
        <Grid item xs={12} md={6}>
        <Card raised="true" sx={{height: '100%'}}>
            <Item sx={{height: '100%'}}>
            {props.type === 'author' ? (
                <CreateTwoToneIcon sx={{fontSize: '75px'}}/>
            ) : props.type === 'dec' ? (
                <CurrencyBitcoinTwoToneIcon sx={{fontSize: '75px'}}/>
            ) : props.type === 'reader' ? (
                <MenuBookTwoToneIcon sx={{fontSize: '75px'}}/>
            ) : props.type === 'fun' ? (
                <CelebrationTwoToneIcon sx={{fontSize: '75px'}}/>
            ) : (
                <RocketLaunchTwoToneIcon sx={{fontSize: '75px'}}/>
            )}
            <Typography variant="h3">
                {props.title}
            </Typography>
                <List>
                    {listItems}
                </List>
            </Item>
            </Card>
        </Grid>
    );
};

export default RoadmapItem;