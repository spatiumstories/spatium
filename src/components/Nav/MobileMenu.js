import CharacterSVG from "../UI/CharacterSVG";
import RoadMapSVG from "../UI/RoadMapSVG";
import StorySVG from "../UI/StorySVG";
import Actions from "./Actions";

const MobileMenu = (props) => {
    return (
        <div className="mobile-menu">
            <ul className="">
                <li className="flex"><RoadMapSVG/><div className="block text-xl px-2 py-6 m-6 text-green-42 font-white font-mono font-semibold">RoadMap</div></li>
                <li className="flex"><StorySVG/><div className="block text-xl px-2 py-6 m-6 text-white font-mono font-semibold transition duration-300">Stories</div></li>
                <li className="flex"><CharacterSVG/><div className="block text-xl px-2 py-6 m-6 text-white font-mono font-semibold transition duration-300">Character NFTs</div></li>
                <li className="py-16 content-center"><Actions/></li>
            </ul>
        </div>
    );
};

export default MobileMenu;