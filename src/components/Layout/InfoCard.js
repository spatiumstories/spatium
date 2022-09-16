import * as React from 'react';
import dragon from '../../assets/dragon.png';
import deso from '../../assets/deso.png';
import mint from '../../assets/mint.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const InfoCard = (props) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.img === 'dragon' ? dragon : props.img === 'deso' ? deso : mint}
          alt="the dragon"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default InfoCard;
