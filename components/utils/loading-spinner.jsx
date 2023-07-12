import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = ({ bgColor, textColor, message }) => {
	return (
		<>
			<div className="flex justify-center mt-10 mx-auto">
				<Oval
					height={70}
					width={70}
					color={bgColor}
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
					ariaLabel="oval-loading"
					secondaryColor={bgColor}
					strokeWidth={2}
					strokeWidthSecondary={2}
				/>
			</div>
			<div className="flex justify-center mx-auto">
				<h3 className={`${textColor} font-semibold text-l`}>{message}</h3>
			</div>
		</>
	);
};

export default Loader;
