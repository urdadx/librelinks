import Navbar from "./navbar/navbar";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar showName={false} isHomePage={false} />
			<main className="bg-[#F2F4F7] flex flex-row h-screen">{children}</main>
		</>
	);
};

export default Layout;
