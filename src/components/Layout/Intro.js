import classes from './Intro.module.css';
import image from '../../assets/pencil.svg';
import React from 'react';
import { isMobile } from 'react-device-detect';

const Intro = (props) => {
    return (
        <div className={classes.intro}>
            <span>
                <h1>Spatium Stories</h1>
                <p>A brand new NFT book marketplace.</p>
            </span>
            {!isMobile && <img className={classes.animate} src={image}/>}
        </div>
    );
};

export default React.memo(Intro);