import classes from './Button.module.css';
import React from 'react';

const Button = (props) => {
    return (
        <button
            type={props.type || 'button'}
            onClick={props.onClick}
            className={`${classes.button} ${classes['button-gradient']} ${props.className}`}>
            {props.children}
        </button>
    );
}

export default Button;