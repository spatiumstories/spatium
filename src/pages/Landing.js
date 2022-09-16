import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Layout/Copyright';
import Intro from '../components/Layout/Intro';
import Signup from '../components/Blog/Signup';
import React from 'react';
import Info from '../components/Layout/Info';

const Landing = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
    return (
        <React.Fragment>
        <Grid container component="main" sx={{ height: '100%', width: '100%'}}>
          <CssBaseline />
          <Grid item xs={12} sm={8} md={6} component={Paper} square>
            <Intro/>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            elevation={6}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?book)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        <Signup/>
        <Grid item xs={12} component={Paper} square>
            <Info/>
          </Grid>
        </Grid>
        </React.Fragment>
    );
};

export default Landing;