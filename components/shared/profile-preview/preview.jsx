import useCurrentUser from "@/hooks/useCurrentUser";

const Preview = () => {
	const { data: currentUser } = useCurrentUser();

	return (
		<>
			<div className="relative border-[4px] lg:border-[8px] border-black rounded-[2.5rem] w-60 lg:w-60 xl:w-64 aspect-[9/19] overflow-hidden max-w-sm mx-auto z-0">
				<div className="absolute inset-0 z-10">
					{currentUser && (
						<iframe
							seamless
							loading="lazy"
							title="preview"
							id="preview"
							width="100%"
							height="100%"
							className="h-full w-full"
							src={`http://localhost:3000/${currentUser?.handle}?isIframe=true`}></iframe>
					)}
				</div>
			</div>
		</>
	);
};

export default Preview;
