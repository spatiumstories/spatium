import image from '../../assets/S.png';
import Button from '../UI/Button';
import classes from './Header.module.css';
import DesktopNavBar from '../Nav/DesktopNavBar';
import MobileNavBar from '../Nav/MobileNavBar';
import React from 'react';
import { isMobile } from 'react-device-detect';



const Header = (props) => {

    const classList = !isMobile ? `${classes.header}` : "";
    return (
        <header className={classList}>
            <nav className="w-full">
                {isMobile && <MobileNavBar/>}
                {!isMobile && <DesktopNavBar />}
            </nav>
        </header>
    );
};

export default React.memo(Header);