import classes from './RoadmapPicker.module.css';
import RoadMapNav from '../Nav/RoadMapNav';

const RoadmapPicker = (props) => {

    const onClickHandler = (event) => {
        console.log(event.target.id);
        const picker = event.target.id;
        props.changePickerHandler(picker);
    }
    return (
        <div className={classes.picker}>
            <RoadMapNav onClick={onClickHandler} active={props.selected === "first" ? "true" : "false"} id="first" label="1st Quarter"></RoadMapNav>
            <RoadMapNav onClick={onClickHandler} active={props.selected === "second" ? "true" : "false"} id="second" label="2nd Quarter"></RoadMapNav>
            <RoadMapNav onClick={onClickHandler} active={props.selected === "third" ? "true" : "false"} id="third" label="3rd Quarter"></RoadMapNav>
            <RoadMapNav onClick={onClickHandler} active={props.selected === "fourth" ? "true" : "false"} id="fourth" label="4th Quarter"></RoadMapNav>
            <RoadMapNav onClick={onClickHandler} active={props.selected === "future" ? "true" : "false"} id="future" label="Future"></RoadMapNav>
        </div>
    );
};

export default RoadmapPicker;