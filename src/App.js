import React from "react";
import Header from "./components/Layout/Header";
import { useState } from 'react';
import "./index.css";
import {Routes, Route, Router} from 'react-router-dom';
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";


function App() {

  return (
    <React.Fragment>
      <div className="bg"/>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/characters' element={<ComingSoon/>}/>
          <Route path='/stories' element={<ComingSoon/>}/>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
