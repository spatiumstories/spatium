import { NavLink } from "react-router-dom";

const NavList = (props) => {
    let activeClass = "cursor-pointer py-4 px-2 text-green-42 border-b-4 border-green-42 font-mono font-semibold"
    let normClass = "cursor-pointer py-4 px-2 text-gray-500 font-mono font-semibold hover:text-green-42 transition duration-300"
        // <NavLink className={classes}>{props.children}</NavLink>

    return (
        <div class="hidden md:flex items-center space-x-1">
            <NavLink to='/' className={navData => navData.isActive ? activeClass : normClass}>RoadMap</NavLink>
            <NavLink to='/stories' className={navData => navData.isActive ? activeClass : normClass}>Stories</NavLink>
            <NavLink to='/characters' className={navData => navData.isActive ? activeClass : normClass}>Character NFTs</NavLink>
        </div>
    );
};

export default NavList;