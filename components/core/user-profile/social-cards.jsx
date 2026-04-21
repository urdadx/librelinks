import { getApexDomain, removeHashFromHexColor } from '@/utils/helpers';
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSnapchat,
  FaSpotify,
  FaTelegram,
  FaTiktok,
  FaTwitch,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';
import { GlobeIcon, TwitterIcon } from 'lucide-react';

const PLATFORM_ALIASES = {
  behance: 'behance',
  discord: 'discord',
  discordapp: 'discord',
  facebook: 'facebook',
  fb: 'facebook',
  github: 'github',
  instagram: 'instagram',
  linkedin: 'linkedin',
  pin: 'pinterest',
  pinterest: 'pinterest',
  snapchat: 'snapchat',
  spotify: 'spotify',
  t: 'telegram',
  telegram: 'telegram',
  tiktok: 'tiktok',
  twitch: 'twitch',
  twitter: 'twitter',
  whatsapp: 'whatsapp',
  x: 'twitter',
  youtube: 'youtube',
  youtu: 'youtube',
};

const PLATFORM_ICONS = {
  discord: FaDiscord,
  facebook: FaFacebook,
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  pinterest: FaPinterest,
  snapchat: FaSnapchat,
  spotify: FaSpotify,
  telegram: FaTelegram,
  tiktok: FaTiktok,
  twitch: FaTwitch,
  twitter: TwitterIcon,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
};

export const SocialCards = ({ url, title, color, registerClicks }) => {
  const validColor = removeHashFromHexColor(color);
  const platform = getSocialPlatform(url, title);
  const Icon = PLATFORM_ICONS[platform] || GlobeIcon;

  return (
    <a
      onClick={registerClicks}
      target="_blank"
      href={url}
      aria-label={title}
      className="flex h-[30px] w-[30px] items-center justify-center rounded-full px-2 transition-transform hover:scale-125 md:h-[35px] md:w-[35px] lg:h-[42px] lg:w-[42px]"
      rel="noreferrer"
      style={{ color: `#${validColor}` }}
    >
      <Icon className="h-[24px] w-[24px] md:h-[28px] md:w-[28px] lg:h-[32px] lg:w-[32px]" />
    </a>
  );
};

function getSocialPlatform(url, title) {
  const domain = getApexDomain(url);
  const siteName = domain.split('.')[0]?.toLowerCase();
  const normalizedTitle = title?.trim().toLowerCase();

  return (
    PLATFORM_ALIASES[siteName] ||
    PLATFORM_ALIASES[normalizedTitle] ||
    null
  );
}
