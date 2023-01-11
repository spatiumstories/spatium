import React, { useRef, useState, useEffect } from "react"
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import image from '../assets/hour.png';
import Button from '@mui/material/Button';
import Pricing from '../components/Author/Pricing';
import PublishNewBook from '../components/Author/PublishNewBook';
import CircularProgress from '@mui/material/CircularProgress';
import Deso from 'deso-protocol';
import { useSelector, useDispatch } from "react-redux";
import { userActions } from '../store/user-slice';
import LoginIcon from '@mui/icons-material/Login';



const Publisher = () => {
    const [authorized, setAuthorized] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [userKey, setUserKey] = useState(null);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const deso = new Deso();

    useEffect(() => {
        const verify = async () => {
          const postHashHex = "61e5e2c68393b94d8be0bea87f093b80de67db261d3d3f21e81f2052940831eb";
  
          const request = {
            "PostHashHex": postHashHex
          };
          deso.nft.getNftEntriesForPostHash(request).then(response => {
            let nftResponses = response['data']['NFTEntryResponses'];
            let length = nftResponses['length'];
            for (var i = 0; i < length; i++) {
              if (userKey === nftResponses[`${i}`]['OwnerPublicKeyBase58Check']) {
                setVerifying(false);
                setAuthorized(true);
                break;
              }
            }
            setVerifying(false);
          }).catch(e => {
              setVerifying(false);
          });
        }
        verify();
      }, [userKey]);

      useEffect(() => {
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
    }, [user]);

    const onLoginHandler = async () => {
        const response = await deso.identity.login(2);
        const profilePic = await deso.user.getSingleProfilePicture(response.key);
        const profile = await deso.user.getSingleProfile({"PublicKeyBase58Check": response.key});
        // localStorage.setItem("key", response.key);
        // localStorage.setItem('loggedin', 'true');
        setUserKey(response.key);
        dispatch(userActions.logIn({"key": response.key, "profilePic": profilePic, "userName": profile.Profile.Username}));
    }

    useEffect(() => {
        if (localStorage.getItem('loggedin') === 'true') {
          setUserKey(localStorage.getItem("key"));
        } else {
          setVerifying(false);
        }
    }, []);


    return (
        <React.Fragment>
            {verifying ? (
                <Stack sx={{height: "100vh", paddingTop: '30vh', alignItems: 'center', justifyItems: 'center'}}>
                    <Typography variant="h4">Verifying Author Tier :)</Typography>
                    <CircularProgress color="success" />
                </Stack>
            ) : userKey === null ? (
                <Stack sx={{height: "100vh", paddingTop: '30vh', alignItems: 'center', justifyItems: 'center'}}>
                    <Typography sx={{padding:'20px'}} variant="h4">Please login to publish your story!</Typography>
                    <Button onClick={onLoginHandler} color="secondary" variant="contained" sx={{display: {xs: 'none', md: 'flex'}}}><LoginIcon sx={{paddingRight: '2px'}}/>Login with DeSo</Button>
                    <Button onClick={onLoginHandler} color="secondary" variant="contained" sx={{display: {xs: 'flex', md: 'none'}}}>Login</Button>
                </Stack>
            ): !authorized ? (
                <Pricing authorOpen={true} />
            ) : (
                <PublishNewBook/>
            )}
        </React.Fragment>
    );
};

export default Publisher;