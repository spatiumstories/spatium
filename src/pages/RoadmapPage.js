import React from "react";
import Intro from "../components/Layout/Intro";
import Roadmap from "../components/Roadmap/Roadmap";
import MobileMenu from "../components/Nav/MobileMenu";
import Signup from "../components/Blog/Signup";
import { useSelector } from "react-redux";

const RoadmapPage = (props) => {
    const showMenu = useSelector(state => state.mobile.showMenu);
    return (
        <React.Fragment>
            {!showMenu && <Roadmap />}
            {showMenu && <MobileMenu />}
        </React.Fragment>
    );
};

export default RoadmapPage;