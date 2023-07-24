import LinksEditor from "../../components/core/admin-panel/links-editor";
import Layout from "@/components/layout/_layout";

const Admin = () => {
	return (
		<>
			<Layout>
				<div className="w-full lg:w-3/5 pl-4 pr-4 border-r overflow-scroll">
					<LinksEditor />
					<div className="h-[60px]" />
				</div>
			</Layout>
		</>
	);
};

export default Admin;
