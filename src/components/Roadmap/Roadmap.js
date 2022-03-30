import React, { useEffect } from 'react';
import classes from './Roadmap.module.css';
import { rawData } from '../../data/data';
import RoadmapPicker from './RoadmapPicker';
import { useSelector } from 'react-redux';
import RoadmapItemContainer from './RoadmapItemContainer';

let firstRender = true;
let first = [];
let second = [];
let third = [];
let fourth = [];
let future = [];
rawData.map(item => {

    if (item.id <= 6) {
        first.push(
            <RoadmapItemContainer
                name={item.name}
                description={item.description}
                date={item.date}
                id={item.id}
                key={item.id}>
            </RoadmapItemContainer>
        );
    } else if (item.id === 7) {
        second.push(
            <RoadmapItemContainer
                name={item.name}
                description={item.description}
                date={item.date}
                id={item.id}
                key={item.id}>
            </RoadmapItemContainer>
        );
    } else if (item.id === 8) {
        third.push(
            <RoadmapItemContainer
                name={item.name}
                description={item.description}
                date={item.date}
                id={item.id}
                key={item.id}>
            </RoadmapItemContainer>
        );
    } else if (item.id <= 10) {
        fourth.push(
            <RoadmapItemContainer
                name={item.name}
                description={item.description}
                date={item.date}
                id={item.id}
                key={item.id}>
            </RoadmapItemContainer>
        );
    } else {
        future.push(
            <RoadmapItemContainer
                name={item.name}
                description={item.description}
                date={item.date}
                id={item.id}
                key={item.id}>
            </RoadmapItemContainer>
        );
    }
});

const Roadmap = () => {
    const picker = useSelector(state => state.roadmap.currentQuarter);

    useEffect(() => {
        if (firstRender) {
            firstRender = false;
        } else {
            window.scroll({
                top: document.body.offsetHeight,
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [picker]);

    const currentSelection = 
        picker === "0" ? first :
        picker === "1" ? second :
        picker === "2" ? third :
        picker === "3" ? fourth :
        future;

    return (
        <React.Fragment>
            <RoadmapPicker/>
            <ul className={classes.list}>
                {currentSelection}
            </ul>
        </React.Fragment>
    );
};

export default Roadmap;