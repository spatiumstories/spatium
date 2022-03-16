import NavItem from "./NavItem";

const NavList = (props) => {
    return (
        <div class="hidden md:flex items-center space-x-1">
            <NavItem selected={true}>RoadMap</NavItem>
            <NavItem>Stories</NavItem>
            <NavItem>Character NFTs</NavItem>
        </div>
    );
};

export default NavList;