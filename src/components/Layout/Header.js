import image from '../../assets/S.png';
import Button from '../UI/Button';
import classes from './Header.module.css';
import DesktopNavBar from '../Nav/DesktopNavBar';
import MobileNavBar from '../Nav/MobileNavBar';
import React from 'react';



const Header = (props) => {
    const classList = "";
    return (
        <header className={classList}>
            <nav className="w-full">
                <MobileNavBar mobileMenu={props.showMenu} mobileToggle={props.mobileToggle}/>
            </nav>
        </header>
    );
};

export default React.memo(Header);