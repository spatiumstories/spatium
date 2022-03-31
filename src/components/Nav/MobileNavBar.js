import React from "react";
import HamburgerButton from "../UI/HamburgerButton";
import Logo from "./Logo";
import { useDispatch } from 'react-redux';
import { mobileActions } from '../../store/mobile-slice';


const MobileNavBar = (props) => {
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(mobileActions.toggleMenu());
    }
    return (
        <div className="grid-cols-5 inline-grid gap-4 px-4 py-4 items-start">
            <span className="w-1/2 h-1/2 col-start-1 col-span-3">
                <Logo />
            </span>
            <span className="w-full h-full py-10 col-start-5">
                <HamburgerButton onClick={onClickHandler}/>
            </span>
        </div>
    );
};

export default MobileNavBar;