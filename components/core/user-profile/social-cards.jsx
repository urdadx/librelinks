/* eslint-disable @next/next/no-img-element */
import { getApexDomain, removeHashFromHexColor } from '@/utils/helpers';
export const SocialCards = ({ url, title, color, registerClicks }) => {
  const validColor = removeHashFromHexColor(color);

  // checking for website aliases: adding more soon
  const specialCases = {
    x: 'twitter',
    fb: 'facebook',
    pin: 'pinterest',
    discordapp: 'discord',
    t: 'telegram',
  };

  const getSocialMediaName = (url) => {
    const domainURL = getApexDomain(url);
    // Use a regular expression to match only the site name
    const siteName = domainURL.match(/^[^.]+/);

    if (siteName && !(siteName in specialCases)) {
      return siteName[0];
    } else {
      return specialCases[siteName[0]];
    }
  };

  const socialIcon = getSocialMediaName(url);

  return (
    <>
      <a
        onClick={registerClicks}
        target="_blank"
        href={url}
        className="hover:scale-125 transition-all w-[30px] h-[30px]  md:h-[35px] md:w-[35px] rounded-full px-2 lg:w-[42px] lg:h-[42px]"
      >
        <img
          loading="lazy"
          src={`https://s2.svgbox.net/social.svg?color=${validColor}&ic=${socialIcon}`}
          className="w-[42px] h-[42px]"
          alt={title}
        />
      </a>
    </>
  );
};
