import Card from "../UI/Card";
import classes from "./RoadmapItemContainer.module.css";

const RoadmapDescription = (props) => {
    const transparent = props.flip ? "invisible" : "";
    return (
        <Card id={props.id} onClick={props.onClick}>
            <li>
                <div className={classes['list-item']}>
                    <p className={transparent}>{props.description}</p>
                </div>
            </li>
        </Card>
    );
};

export default RoadmapDescription;