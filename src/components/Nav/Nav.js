import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import image from '../../assets/S.png';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import User from './User';
import { useNavigate } from 'react-router';


const useStyles = makeStyles({
    logo: {
        maxWidth: '5%',
        maxHeight: '5%',
        display: {xs: 'none', md: 'flex'}
    },
    logoMobile: {
        maxWidth: '10%',
        maxHeight: '10%'
    },
    link: {
        padding: '20px',
        color: 'white',
        textDecoration: 'none',
    },
    linkActive: {
        padding: '20px',
        color: '#14F195',
        textDecoration: 'none',
    },
    linkMobile: {
        color: 'black',
        textDecoration: 'none'
    },
    linkActiveMobile: {
        color: '#14F195',
        textDecoration: 'none'
    }
});

const pages = [['Home', '/'], ['Marketplace', '/marketplace'], ['Publish', '/publish'], ['Road Map', '/roadmap']];

const Nav = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    console.log(event);
    setAnchorElNav(null);
  };

  const onClickLogoHandler = () => {
    navigate('/');
  }



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box component="img"src={image} alt="Logo" className={classes.logo} sx={{display: {xs: 'none', md: 'flex'}}}/>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                    <NavLink to={page[1]} className={navData => navData.isActive ? classes.linkActiveMobile : classes.linkMobile}>{page[0]}</NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box onClick={onClickLogoHandler} component="img"src={image} alt="Logo" className={classes.logoMobile} sx={{display: {xs: 'flex', md: 'none'}, mr:1}}/>
          <Typography
            onClick={onClickLogoHandler}
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SPATIUM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLink to='/' className={navData => navData.isActive ? classes.linkActive : classes.link}>Home</NavLink>
            <NavLink to='/marketplace' className={navData => navData.isActive ? classes.linkActive : classes.link}>Marketplace</NavLink>
            <NavLink to='/publish' className={navData => navData.isActive ? classes.linkActive : classes.link}>Publish</NavLink>
            <NavLink to='/roadmap' className={navData => navData.isActive ? classes.linkActive : classes.link}>Road Map</NavLink>
          </Box>


          <User />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;