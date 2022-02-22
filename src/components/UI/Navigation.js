import classes from './Navigation.module.css';

const Navigation = (props) => {
    const style = `${classes.button} ${props.active === 'true' ? classes['button_active'] : ''}`;
    return (
        <button id={props.id} onClick={props.onClick} className={style}>{props.label}</button>
    );
};

export default Navigation;