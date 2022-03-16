import React from "react";
import Button from "../UI/Button";

const onClickHandler = () => {
    window.open("https://diamondapp.com/u/Spatium");
}

const Actions = (props) => {
    return (
        <span className="flex items-center inset-y-0 right-0">
            <Button onClick={onClickHandler}>Built on DeSo</Button>
            {/* <a href="" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</a>
            <a href="" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</a> */}
        </span>
    );
};

export default Actions;