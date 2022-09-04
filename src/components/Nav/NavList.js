import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    nav: {
        padding: theme.spacing(8, 8, 6),
        alignItems: 'center',
    }
}));

const NavList = (props) => {
    const classes = useStyles();
    let activeClass = "cursor-pointer py-4 px-2 text-green-42 border-b-4 border-green-42 font-mono font-semibold"
    let normClass = "cursor-pointer py-4 px-2 text-gray-500 font-mono font-semibold hover:text-green-42 transition duration-300"
        // <NavLink className={classes}>{props.children}</NavLink>

    return (
        <AppBar position="relative" sx={{
            bgcolor: '#9945FF'
            }}>
            <Toolbar className={classes.nav}>
              <CameraIcon sx={{ mr: 2 }} />
              <NavLink to='/' className={navData => navData.isActive ? activeClass : normClass}>Home</NavLink>
              <NavLink to='/stories' className={navData => navData.isActive ? activeClass : normClass}>Marketplace</NavLink>
              <NavLink to='/characters' className={navData => navData.isActive ? activeClass : normClass}>Character NFTs</NavLink>
              <NavLink to='/roadmap' className={navData => navData.isActive ? activeClass : normClass}>Road Map</NavLink>
            </Toolbar>
          </AppBar>
    );
};

export default NavList;