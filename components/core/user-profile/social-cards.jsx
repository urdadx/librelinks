/* eslint-disable @next/next/no-img-element */
import { extractSiteFromUrl, removeHashFromHexColor } from "@/utils/helpers";
export const SocialCards = ({ url, title, color, registerClicks }) => {
	const validColor = removeHashFromHexColor(color);
	const validURL = extractSiteFromUrl(url);

	return (
		<>
			<a
				onClick={registerClicks}
				target="_blank"
				href={url}
				className="hover:scale-125 transition-all w-[30px] h-[30px] rounded-full px-2 lg:w-[42px] lg:h-[42px]">
				<img
					loading="lazy"
					src={`https://s2.svgbox.net/social.svg?color=${validColor}&ic=${validURL}`}
					className="w-[42px] h-[42px]"
					alt={title}
				/>
			</a>
		</>
	);
};
