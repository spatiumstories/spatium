import React from "react";
import { useState } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import Bookshelf from "./pages/Bookshelf";
import Publisher from "./pages/Publisher";
import Footer from './components/Layout/Footer';
import Landing from './pages/Landing';
import Nav from "./components/Nav/Nav";
import Marketplace from "./pages/Marketplace";
import Roadmap from "./pages/Roadmap";
import SpatiumReader from "./components/Reader/SpatiumReader";
import MintingNow from "./pages/MintingNow";
import BookPage from "./pages/BookPage";
import Auth from "./components/Nav/Auth";
import Profile from "./pages/Profile";
import EditBookPage from "./pages/EditBookPage";


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
  let location = useLocation();
  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!location.pathname.includes('/read') && <Nav/>}
      <body>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/marketplace' element={<Marketplace/>}/>
          <Route path='/publish' element={<Publisher/>}/>
          <Route path='/roadmap' element={<Roadmap/>}/>
          <Route path='/bookshelf/:id' element={<Bookshelf/>}/>
          <Route path='/r2m2' element={<MintingNow/>}/>
          <Route path='/read/:book' element={<SpatiumReader/>}/>
          <Route path='/marketplace/:postHashHex' element={<BookPage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/edit/:postHashHex' element={<EditBookPage/>}/>
          {/* <Route path='/auth' element={<Auth/>}/> */}
        </Routes>
      </body>
      {!location.pathname.includes('/read') && <Footer/>}
    </ThemeProvider>
  );
}

export default App;
