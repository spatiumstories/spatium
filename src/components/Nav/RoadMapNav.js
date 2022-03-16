import classes from './RoadMapNav.module.css';

const RoadMapNav = (props) => {
    const style = `${classes.button} ${props.active === 'true' ? classes['button_active'] : ''}`;
    return (
        <button id={props.id} onClick={props.onClick} className={style}>{props.label}</button>
    );
};

export default RoadMapNav;