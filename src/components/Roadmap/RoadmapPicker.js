import classes from './RoadmapPicker.module.css';
import RoadMapNav from '../Nav/RoadMapNav';

const RoadmapPicker = (props) => {
    return (
        <div className={classes.picker}>
            <RoadMapNav id="0">1st Quarter</RoadMapNav>
            <RoadMapNav id="1">2nd Quarter</RoadMapNav>
            <RoadMapNav id="2">3rd Quarter</RoadMapNav>
            <RoadMapNav id="3">4th Quarter</RoadMapNav>
            <RoadMapNav id="4">Future</RoadMapNav>
        </div>
    );
};

export default RoadmapPicker;