import classes from './Intro.module.css';
import image from '../../assets/pencil.svg';
import React from 'react';

const Intro = (props) => {
    return (
        <div className={classes.intro}>
            <span>
                <h1>Spatium Roadmap</h1>
                <p>The first NFT project based on fictional short stories.</p>
            </span>
            <img className={classes.animate} src={image}/>
        </div>
    );
};

export default React.memo(Intro);