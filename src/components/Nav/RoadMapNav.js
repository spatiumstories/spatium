import classes from './RoadMapNav.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { roadmapActions } from '../../store/roadmap-slice';

const RoadMapNav = (props) => {
    const dispatch = useDispatch();
    const picker = useSelector(state => state.roadmap.currentQuarter);

    const onClickHandler = () => {
        dispatch(roadmapActions.newQuarter({quarter: props.id}));
    }

    const style = `${classes.button} ${props.id === picker ? classes['button_active'] : ''}`;
    return (
        <button onClick={onClickHandler} id={props.id} className={style}>{props.children}</button>
    );
};

export default RoadMapNav;