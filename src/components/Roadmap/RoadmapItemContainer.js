import RoadmapItem from "./RoadmapItem";
import RoadmapDescription from "./RoadmapDescription";
import React, { useState, useCallback } from "react";
import classes from './RoadmapItemContainer.module.css';

const RoadmapItemContainer = (props) => {

    const [showDescription, setShowDescription] = useState(false);
    const [flip, setFlip] = useState(0);
    const [ease, setEase] = useState(1);


    const onClickHandler = useCallback(() => {
        setFlip(1);
        setEase(1);
    }, []);

    const animationEndedHandler = useCallback(() => {
        setFlip(0);
        setShowDescription(oldRes => {
            return !oldRes;
        })
    }, []);

    const easeEndedHandler = useCallback(() => {
        setEase(0);
    }, []);

    return (
        <div
            className={classes.ease}
            ease={ease}
            onAnimationEnd={easeEndedHandler}
        >
            <div
                className={classes.rotate}
                onAnimationEnd={animationEndedHandler}
                flip={flip}
            >
                {!showDescription && <RoadmapItem id={props.id} onClick={onClickHandler} flip={flip} name={props.name} date={props.date}/>}
                {showDescription && <RoadmapDescription id={props.id} onClick={onClickHandler} flip={flip} description={props.description}/>}
            </div>
        </div>
    )
}

export default RoadmapItemContainer;