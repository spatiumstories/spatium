import React from 'react';
import RoadmapItemContainer from './RoadmapItemContainer';
import classes from './Roadmap.module.css';
import { data } from '../../data/data';

const DUMMY = [
    {
        name: "First Story Released",
        description: "a boy named David",
        date: "February 2022",
        id: 1
    },
    {
        name: "Website Launch",
        description: "a girl named Taylor",
        date: "February 2022",
        id:2
    },
    {
        name: "Lucy",
        description: "a boy named David",
        date: "12/07/1995",
        id: 3
    },
    {
        name: "Merlin",
        description: "a girl named Taylor",
        date: "03/06/1997",
        id:4
    },
    {
        name: "Lucy",
        description: "a boy named David",
        date: "12/07/1995",
        id: 5
    },
    {
        name: "Merlin",
        description: "a girl named Taylor",
        date: "03/06/1997",
        id:6
    }
];
const Roadmap = (props) => {

    const allItems = data.map(item =>
        <RoadmapItemContainer
            name={item.name}
            description={item.description}
            date={item.date}
            id={item.id}
            key={item.id}>
        </RoadmapItemContainer>
    );

    return (
        <ul className={classes.list}>
            {allItems}
        </ul>
    );
};

export default Roadmap;