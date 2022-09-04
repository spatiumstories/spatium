import Button from '../UI/Button';
import DesktopNavBar from '../Nav/DesktopNavBar';
import MobileNavBar from '../Nav/MobileNavBar';
import React from 'react';
import { isMobile } from 'react-device-detect';



const Header = (props) => {

    // const classList = !isMobile ? `${classes.header}` : "";
    return (
        <header>
            <nav className="w-full">
                {isMobile && <MobileNavBar/>}
                {!isMobile && <DesktopNavBar />}
            </nav>
        </header>
    );
};

export default React.memo(Header);