import Card from "../UI/Card";
import classes from "./RoadmapItemContainer.module.css";

const RoadmapItem = (props) => {
    const transparent = props.flip ? "invisible" : "";
    return (
        <Card id={props.id} onClick={props.onClick}>
            <li>
                <div className={classes['list-item']}>
                    <h3 className={transparent}>{props.name}</h3>
                    <h4 className={transparent}>{props.date}</h4>
                </div>
            </li>
        </Card>
    );
};

export default RoadmapItem;