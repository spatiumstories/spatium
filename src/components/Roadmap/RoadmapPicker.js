import classes from './RoadmapPicker.module.css';
import Navigation from '../UI/Navigation';

const RoadmapPicker = (props) => {

    const onClickHandler = (event) => {
        console.log(event.target.id);
        const picker = event.target.id;
        props.changePickerHandler(picker);
    }
    return (
        <div className={classes.picker}>
            <Navigation onClick={onClickHandler} active={props.selected === "first" ? "true" : "false"} id="first" label="1st Quarter"></Navigation>
            <Navigation onClick={onClickHandler} active={props.selected === "second" ? "true" : "false"} id="second" label="2nd Quarter"></Navigation>
            <Navigation onClick={onClickHandler} active={props.selected === "third" ? "true" : "false"} id="third" label="3rd Quarter"></Navigation>
            <Navigation onClick={onClickHandler} active={props.selected === "fourth" ? "true" : "false"} id="fourth" label="4th Quarter"></Navigation>
            <Navigation onClick={onClickHandler} active={props.selected === "future" ? "true" : "false"} id="future" label="Future"></Navigation>
        </div>
    );
};

export default RoadmapPicker;