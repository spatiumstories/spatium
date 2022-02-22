import image from '../../assets/S.png';
import Button from '../UI/Button';
import classes from './Header.module.css';
import React from 'react';

const onClickHandler = () => {
    window.open("https://diamondapp.com/u/Spatium");
}

// const downloadRoadMap = () => {

// }

const Header = (props) => {
    return (
        <header className={classes.header}>
            <span>
                <img src={image} />
            </span>
            <span>
                <Button onClick={onClickHandler}>A DeSo Project</Button>
            </span>
            {/* <span>
                <Button onClick={downloadRoadMap}>Download Roadmap</Button>
            </span> */}
        </header>
    );
};

export default React.memo(Header);