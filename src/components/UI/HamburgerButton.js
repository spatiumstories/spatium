const HamburgerButton = (props) => {
    return (
        <button onClick={props.onClick} className="outline-none mobile-menu-button">
            <svg className="w-1/2 h-1/2 text-gray-500 hover:text-green-42"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
    </button>
    );
};

export default HamburgerButton;