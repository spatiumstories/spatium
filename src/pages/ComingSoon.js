import React from "react";
import MobileMenu from "../components/Nav/MobileMenu";
import { useSelector } from "react-redux";

const ComingSoon = (props) => {
    const showMenu = useSelector(state => state.mobile.showMenu);
    return (
        <React.Fragment>
            {!showMenu && <p className="text-white">Coming Soon! :)</p>}
            {showMenu && <MobileMenu />}
        </React.Fragment>
    );
};

export default ComingSoon;