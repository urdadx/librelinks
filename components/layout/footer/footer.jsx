import Link from "next/link";

const Footer = () => {
	return (
		<>
			<footer className="relative mb-24 left-1/2 bottom-2 transform -translate-x-1/2 w-[200px]">
				<p className="mt-10 mb-4 text-black text-semibold text-center text-lg">
					Made by{" "}
					<Link
						className="text-blue-800"
						target="_blank"
						href="https://twitter.com/NerdyProgramme2">
						@urdadx
					</Link>{" "}
				</p>
			</footer>
		</>
	);
};

export default Footer;
