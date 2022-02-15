import React from "react";
import Roadmap from "./components/Roadmap/Roadmap";
import Header from "./components/Layout/Header";
import Intro from "./components/Layout/Intro";
import "./index.css";


function App() {
  return (
    <React.Fragment>
      <div className="bg"/>
      <Header />
      <Intro />
      <Roadmap />
    </React.Fragment>
  );
}

export default App;
