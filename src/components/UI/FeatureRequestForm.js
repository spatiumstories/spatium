import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Deso } from 'deso-protocol';

const FeatureRequestForm = (props) => {
    const user = useSelector(state => state.user);
    const [emailErr, setEmailErr] = useState(false);
    const [ideaErr, setIdeaErr] = useState(false);

    const validate = (email, idea) => {
        let valid = true;
        if (idea === '') {
            setIdeaErr(true);
            valid = false;
        }

        if (email === '' || !email.includes('@')) {
            setEmailErr(true);
            valid = false;
        }

        return valid;
    }

    const handleEmailChange = () => {
        setEmailErr(false);
    }

    const handleIdeaChange = () => {
        setIdeaErr(false);
    }


    const handleSubmit = (event) => {
        let deso = new Deso();
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let valid = validate(data.get('email'), data.get('feature'));
        if (valid) {
            let email = {
                email: data.get('email'),
                idea: data.get('feature'),
                subscribe: data.get('subscribe') === 'true' ? 'yes' : 'no',
                user: user.userName
            };
            let message = `New Idea!\n From: ${email.user}\n Email: ${email.email}\n Idea: ${email.idea}\n Please subscribe? ${email.subscribe}`;
            const request = {
                "RecipientPublicKeyBase58Check": "BC1YLg9piUDwrwTZfRipfXNq3hW3RZHW3fJZ7soDNNNnftcqrJvyrbq",
                "SenderPublicKeyBase58Check": user.publicKey,
                "MessageText": message
            };
            deso.social.sendMessage(request)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            props.close();
            props.handleOnSuccess();
        }
      };
    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <HandymanTwoToneIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Got a feature idea?
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={emailErr}
                    onChange={handleEmailChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="feature"
                    label="Feature Idea"
                    type="text"
                    multiline="true"
                    minRows="4"
                    id="feature"
                    autoComplete="idea"
                    error={ideaErr}
                    onChange={handleIdeaChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox name="subscribe" id="subscribe" value="true" color="primary" />}
                        label="Subscribe to our newsletter and stay up to date on new features."
                    />
                </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Send!
                </Button>
            </Box>
        </Box>
    );
};

export default FeatureRequestForm;