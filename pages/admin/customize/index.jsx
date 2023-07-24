import React from "react";
import Layout from "@/components/layout/_layout";
import Footer from "@/components/layout/footer/footer";
import ButtonSelector from "@/components/core/custom-buttons/buttons-selector";
import ThemesPicker from "@/components/core/custom-page-themes/themes-picker";

const Customize = () => {
	return (
		<>
			<Layout>
				<div className="w-full lg:w-3/5 pl-4 pr-4 border-r overflow-auto">
					<ThemesPicker />
					<ButtonSelector />
					<Footer />
				</div>
			</Layout>
		</>
	);
};

export default Customize;
