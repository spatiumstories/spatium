import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';

const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="https://www.spatiumstories.com/">
          Spatium Stories
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  };

export default Copyright;