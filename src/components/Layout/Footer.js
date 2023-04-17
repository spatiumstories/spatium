import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../Layout/Copyright';
import React from 'react';


const Footer = () => {
  return (
    <Box
    component="footer"
    sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    }}
  >
    <Container align="center" maxWidth="sm">
      <Typography variant="body1">
        Not your keys, not your book!
      </Typography>
      <Copyright />
    </Container>
  </Box>
  );
};

export default Footer;