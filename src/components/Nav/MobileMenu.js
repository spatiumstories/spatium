import { NavLink } from "react-router-dom";
import CharacterSVG from "../UI/CharacterSVG";
import RoadMapSVG from "../UI/RoadMapSVG";
import StorySVG from "../UI/StorySVG";
import Actions from "./Actions";
import { useDispatch } from "react-redux";
import { mobileActions } from "../../store/mobile-slice";

const MobileMenu = (props) => {
    let activeClass = "block text-xl px-2 py-6 m-6 text-green-42 font-white font-mono font-semibold"
    let normClass = "block text-xl px-2 py-6 m-6 text-white font-mono font-semibold transition duration-300"

    const dispatch = useDispatch();
    const onClickHandler = (event) => {
        dispatch(mobileActions.toggleMenu());
        dispatch(mobileActions.changeMenu({menu: event.target.id}));
    }
    return (
        <div className="mobile-menu">
            <ul className="">
                <li className="flex"><RoadMapSVG id="0"/><NavLink id="0" onClick={onClickHandler} to='/' className={navData => navData.isActive ? activeClass : normClass}>RoadMap</NavLink></li>
                <li className="flex"><StorySVG id="1"/><NavLink id="1" onClick={onClickHandler} to='/stories' className={navData => navData.isActive ? activeClass : normClass}>Stories</NavLink></li>
                <li className="flex"><CharacterSVG id="2"/><NavLink id="2" onClick={onClickHandler} to='/characters' className={navData => navData.isActive ? activeClass : normClass}>Character NFTs</NavLink></li>
                <li className="py-16 content-center"><Actions/></li>
            </ul>
        </div>
    );
};

export default MobileMenu;