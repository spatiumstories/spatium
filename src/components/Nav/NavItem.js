import React from 'react';

const NavItem = (props) => {
    let classes = props.selected ? "cursor-pointer py-4 px-2 text-green-42 border-b-4 border-green-42 font-mono font-semibold" :
        "cursor-pointer py-4 px-2 text-gray-500 font-mono font-semibold hover:text-green-42 transition duration-300"
    return (
        <div className={classes}>{props.children}</div>
    );
};

export default NavItem;