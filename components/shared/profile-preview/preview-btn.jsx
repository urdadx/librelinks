import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import PreviewMobile from "./preview-mobile";

const PreviewBtn = () => {

	const [isOpen, setIsOpen] = useState(false);
	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	const drawerHeight = typeof window !== "undefined" ? window.innerHeight - 100 : null;

	return (
		<>
			<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden">
				<button
					onClick={toggleDrawer}
					className="block py-2 px-6 rounded-full bg-slate-700 first-letter
					text-white text-center font-bold text-lg shadow-lg hover:bg-slate-600">
					Preview
				</button>
			</div>

			<Drawer
				id="drawer"
				open={isOpen}	
				onClose={toggleDrawer}
				direction="bottom"
				size={drawerHeight}
				className="overflow-auto rounded-t-xl">
				<PreviewMobile close={toggleDrawer} />
			</Drawer>
		</>
	);
};

export default PreviewBtn;
