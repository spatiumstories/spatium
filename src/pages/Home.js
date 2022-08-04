import React from "react";
import Intro from "../components/Layout/Intro";
import Roadmap from "../components/Roadmap/Roadmap";
import Signup from "../components/Blog/Signup";
import MobileMenu from "../components/Nav/MobileMenu";
import { useSelector } from "react-redux";

const Home = (props) => {
    const showMenu = useSelector(state => state.mobile.showMenu);
    return (
        <React.Fragment>
            {!showMenu && <Intro />}
            {/* {!showMenu && <Roadmap />} */}
            {!showMenu && <Signup />}
            {showMenu && <MobileMenu />}
        </React.Fragment>
    );
};

export default Home;