import React from "react";
import Roadmap from "./components/Roadmap/Roadmap";
import Header from "./components/Layout/Header";
import Intro from "./components/Layout/Intro";
import { useState } from 'react';
import "./index.css";
import MobileMenu from "./components/Nav/MobileMenu";


function App() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMobileMenuHandler = () => {
    console.log(showMenu);
    setShowMenu(oldState => {
      return !oldState;
    });
  }

  return (
    <React.Fragment>
      <div className="bg"/>
      <Header mobileMenu={showMenu} mobileToggle={toggleMobileMenuHandler}/>
      {!showMenu && <Intro />}
      {!showMenu && <Roadmap />}
      {showMenu && <MobileMenu />}
    </React.Fragment>
  );
}

export default App;
