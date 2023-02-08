import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/user-slice';
import { useNavigate } from 'react-router';
import LoginIcon from '@mui/icons-material/Login';
import Deso from 'deso-protocol';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';

const settings = ['Profile', 'Bookshelf', 'Publish', 'Logout'];

const useStyles = makeStyles({
    link: {
        padding: '20px',
        color: 'white',
        textDecoration: 'none',
        display: { xs: 'none', md: 'flex' } 
    },
    linkActive: {
        padding: '20px',
        color: '#14F195',
        textDecoration: 'none',
        display: { xs: 'none', md: 'flex' } 
    }
});

const User = (props) => {
    const classes = useStyles();

    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const deso = new Deso();
    const request = 2;

    useEffect(() => {
        if (!pageLoaded) {
            setPageLoaded(true);
            if (localStorage.getItem('loggedin') === 'true') {
                dispatch(userActions.logIn({"key": localStorage.getItem("key"), "profilePic": localStorage.getItem("profilePic"), "userName": localStorage.getItem("userName")}));
            }
        }
    }, [pageLoaded]);
    useEffect(() => {
        if (pageLoaded === true) {
            if (user.loggedin === true) {
                localStorage.setItem("key", user.publicKey);
                localStorage.setItem("profilePic", user.profilePic);
                localStorage.setItem("userName", user.userName);
                localStorage.setItem('loggedin', 'true');
            } else {
                localStorage.setItem('loggedin', 'false');
                localStorage.removeItem("key");
                localStorage.removeItem("profilePic");
                localStorage.removeItem("userName");
            }
        }
    }, [user]);

    const onLoginHandler = async () => {
        const response = await deso.identity.login(request);
        const profilePic = await deso.user.getSingleProfilePicture(response.key);
        const profile = await deso.user.getSingleProfile({"PublicKeyBase58Check": response.key});
        dispatch(userActions.logIn({"key": response.key, "profilePic": profilePic, "userName": profile.Profile.Username}));
    }

    const onLoginHandlerWeb3Auth = async () => {
        // const web3auth = new Web3Auth({
        //     clientId: "BLEzg-1sTxGWpZW4ygaXl8AKvcp99FhI67AhE0lRWSwb43sIGJc1KTO2gdBAhxEmMrXXj9L48t18oY3Eu0YjolI", // Get your Client ID from Web3Auth Dashboard
        //     web3AuthNetwork: "test",
        //     chainConfig: {
        //       chainNamespace: CHAIN_NAMESPACES.EIP155,
        //       chainId: "0x89",
        //       rpcTarget: "https://rpc.ankr.com/eth", // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
        //     },
        //     uiConfig: {
        //       theme: "dark",
        //       loginMethodsOrder: ["facebook", "google"],
        //       appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
        //     },
        //     defaultLanguage: "en",
        //     modalZIndex: "99998",
        //   });
        // const response = await web3auth.loginModal();
        // console.log(response);
        navigate('/auth');
    }


    // ['Profile', 'My Bookshelf', 'Publish', 'Logout'];
    const handleSettingClick = (event) => {
        setAnchorElUser(null);
        console.log(event.target);
        let setting = event.target.id;
        if (setting === "Profile") {
            window.open(`https://diamondapp.com/u/${user.userName}`);
        } else if (setting === "Bookshelf") {
            navigate(`/bookshelf/${user.userName}`);
        } else if (setting === "Publish") {
            navigate('/publish');
        } else if (setting === "Logout") {
            deso.identity.logout(user.publicKey);
            dispatch(userActions.logOut());
            navigate('/');
        }
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

    return (
        <Box sx={{ flexGrow: 0 }}>

        {user.loggedin &&
            <React.Fragment>
                <Box sx={{display: { xs: 'none', md: 'inline' } }}>
                <NavLink to={`/bookshelf/${user.userName}`} className={navData => navData.isActive ? classes.linkActive : classes.link}>Bookshelf</NavLink>
                </Box>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={user.profilePic} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleSettingClick} id={setting}>
                        <Typography textAlign="center" id={setting}>{setting}</Typography>
                    </MenuItem>
                    ))}
                </Menu>
            </React.Fragment>}
        {!user.loggedin &&
            <React.Fragment>
                <Button onClick={onLoginHandler} color="secondary" variant="contained" sx={{display: {xs: 'none', md: 'flex'}}}><LoginIcon sx={{paddingRight: '2px'}}/>Login with DeSo</Button>
                <Button onClick={onLoginHandler} color="secondary" variant="contained" sx={{display: {xs: 'flex', md: 'none'}}}>Login</Button>
            </React.Fragment>
        }
        </Box>
    );
};

export default User;