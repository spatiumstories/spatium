import image from '../../assets/S.png';
const Logo = () => {
    return (
        <div>
            <a className="flex items-center py-4 px-2">
                <img src={image} alt="Logo" className="h-1/4 w-1/4 mr-1"/>
            </a>
        </div>
    );
}

export default Logo;