import Logo from "./Logo";
import NavList from "./NavList";
import Actions from "./Actions";

const DesktopNavBar = (props) => {
    return (
		<div className="mx-auto px-4">
			<div className="grid-cols-6 inline-grid items-center">
				<span className="col-start-1 col-end-3">
					<Logo />
				</span>
				<span className="col-start-3 col-end-5">
					<NavList />
				</span>
				<span className="col-start-6">
					<Actions />
				</span>
			</div>
		</div>
    );
};

export default DesktopNavBar;