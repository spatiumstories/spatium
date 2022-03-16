import React from "react";
import HamburgerButton from "../UI/HamburgerButton";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";


const MobileNavBar = (props) => {
    return (
        <div className="grid-cols-5 inline-grid gap-4 px-4 py-4 items-start">
            <span className="w-1/2 h-1/2 col-start-1 col-span-3">
                <Logo />
            </span>
            <span className="w-full h-full py-10 col-start-5">
                <HamburgerButton onClick={props.mobileToggle}/>
            </span>
        </div>
    );
};

export default MobileNavBar;