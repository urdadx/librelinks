import ccTLDs from "./constants/ccltds";
import { SECOND_LEVEL_DOMAINS, SPECIAL_APEX_DOMAINS } from "./constants";
import ms from "ms";

export const getApexDomain = (url) => {
	let domain;
	try {
		domain = new URL(url).hostname;
	} catch (e) {
		return "";
	}
	// special apex domains (e.g. youtu.be)
	if (SPECIAL_APEX_DOMAINS[domain]) return SPECIAL_APEX_DOMAINS[domain];

	const parts = domain.split(".");
	if (parts.length > 2) {
		// if this is a second-level TLD (e.g. co.uk, .com.ua, .org.tt), we need to return the last 3 parts
		if (
			SECOND_LEVEL_DOMAINS.has(parts[parts.length - 2]) &&
			ccTLDs.has(parts[parts.length - 1])
		) {
			return parts.slice(-3).join(".");
		}
		// otherwise, it's a subdomain (e.g. dub.vercel.app), so we return the last 2 parts
		return parts.slice(-2).join(".");
	}
	// if it's a normal domain (e.g. dub.sh), we return the domain
	return domain;
};

// Verify the URL entered by user
export const validDomainRegex = new RegExp(
	/^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?$/
);

// Get time link was added
export const timeAgo = (timestamp, timeOnly) => {
	if (!timestamp) return "never";
	return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? "" : " ago"}`;
};

// courtesy of chatgpt
export const getInitials = (name) => {
	const words = name.split(" ");
	const initials = words.map((word) => word.charAt(0).toUpperCase());
	return initials.join("");
};

export const signalIframe = () => {
	const iframe = document.getElementById("preview");
	if (iframe) {
		iframe.contentWindow.postMessage("", "*");
	}
};

export const refreshIframe = () => {
	const iframe = (document.getElementById("preview").src += "");
};

export const removeHashFromHexColor = (hexColor) => {
  // Use a regular expression to match the # symbol at the beginning
  return hexColor.replace(/^#/, '');
}

export const extractSiteFromUrl = (url) => {
 const regex = /^(?:https?:\/\/)?(?:www\.)?([^./]+)\./i;
  
  // Use the exec method to find the match
  const match = regex.exec(url);
  
  // If a match is found, return the captured group (website name)
  if (match && match[1]) {
    return match[1];
  } else {
    // If no match is found, return null or an appropriate value
    return null;
  }
}


