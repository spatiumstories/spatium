import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import image from '../assets/hour.png';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';
import Deso from 'deso-protocol';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Publisher = () => {
    const [authorized, setAuthorized] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [userKey, setUserKey] = useState(null);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const deso = new Deso();

    // useEffect(() => {
    //     const verify = async () => {
    //       console.log("verifying!!");
    //       const postHashHex = "61e5e2c68393b94d8be0bea87f093b80de67db261d3d3f21e81f2052940831eb";
  
    //       const request = {
    //         "PostHashHex": postHashHex
    //       };
    //       deso.nft.getNftEntriesForPostHash(request).then(response => {
    //         let nftResponses = response['NFTEntryResponses'];
    //         let length = nftResponses['length'];
    //         for (var i = 0; i < length; i++) {
    //           if (userKey === nftResponses[`${i}`]['OwnerPublicKeyBase58Check']) {
    //             setVerifying(false);
    //             setAuthorized(true);
    //             break;
    //           }
    //         }
    //         setVerifying(false);
    //       }).catch(e => {
    //           setVerifying(false);
    //       });
    //     }
    //     verify();
    //   }, [userKey]);

    useEffect(() => {
        const verify = async () => {
          console.log("verifying!!");
          const response = await fetch(`http://spatiumtest-env.eba-wke3mfsm.us-east-1.elasticbeanstalk.com/api/get-author-associations/${userKey}`);
          let json = await response.json();
          let associations = json["Associations"];
          if (associations.length > 0) {
            setAuthorized(true);
          }
          setVerifying(false);
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
        <Stack sx={{
            width: '100%',
            alignItems: 'center',
            paddingTop: '20px',
            paddingBottom: '20px'
        }}
        spacing={4}
        >
        <Item>
            <Typography variant="h3">The future of web3 publishing is here!</Typography>
        </Item>
        <Box component="img"src={image} alt="Logo" sx={{
            display: 'flex',
            maxWidth: {xs: '100%', md: '40%'},
        }}/>

        <Item>
            <Typography variant="h3">Well...not quite here yet, but very very soon!</Typography>
        </Item>
        </Stack>
    );
};

export default Publisher;