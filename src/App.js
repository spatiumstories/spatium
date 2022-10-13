import React from "react";
import { useState } from 'react';
import {Routes, Route, Router} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import Bookshelf from "./pages/Bookshelf";
import Publisher from "./pages/Publisher";

import Footer from './components/Layout/Footer';
import Landing from './pages/Landing';
import NavList from "./components/Nav/NavList";
import Nav from "./components/Nav/Nav";
import Marketplace from "./pages/Marketplace";
import Roadmap from "./pages/Roadmap";


const themeLight = createTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  },
  typography: {
    fontFamily: [
      'Courier New',
      'Courier',
      'monospace'
    ].join()
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  },
  typography: {
    fontFamily: [
      'Courier New',
      'Courier',
      'monospace'
    ].join()
  }
});

const App = () => {
  const [light, setLight] = useState(true);
  let theme = light ? themeLight : themeDark;
  // theme.typography.h1 = {
  //   fontSize: '1.2rem',
  //   '@media (min-width:600px)': {
  //     fontSize: '4.5rem',
  //   },
  //   [theme.breakpoints.up('md')]: {
  //     fontSize: '2.4rem',
  //   },
  // };
  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav/>
      <body>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/marketplace' element={<Marketplace/>}/>
          <Route path='/publish' element={<Publisher/>}/>
          <Route path='/roadmap' element={<Roadmap/>}/>
          <Route path='/bookshelf/:id' element={<Bookshelf/>}/>
        </Routes>
      </body>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
