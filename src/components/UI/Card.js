import classes from './Card.module.css';
import '../../../node_modules/claymorphism-css/dist/clay.css';

const Card = (props) => {
    const alt = props.id % 2 === 0 ? classes.color1 : classes.color2;
    const style = `${classes.card} ${alt} clay`;
    return (
        <div onClick={props.onClick} className={style}>
            {props.children}
        </div>
    );
};

export default Card;