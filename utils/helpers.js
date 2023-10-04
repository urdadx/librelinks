import ccTLDs from './constants/ccltds';
import { SECOND_LEVEL_DOMAINS, SPECIAL_APEX_DOMAINS } from './constants';
import ms from 'ms';

export const getApexDomain = (url) => {
  let domain;
  try {
    domain = new URL(url).hostname;
  } catch (e) {
    return '';
  }
  // special apex domains (e.g. youtu.be)
  if (SPECIAL_APEX_DOMAINS[domain]) return SPECIAL_APEX_DOMAINS[domain];

  const parts = domain.split('.');
  if (parts.length > 2) {
    // if this is a second-level TLD (e.g. co.uk, .com.ua, .org.tt), we need to return the last 3 parts
    if (
      SECOND_LEVEL_DOMAINS.has(parts[parts.length - 2]) &&
      ccTLDs.has(parts[parts.length - 1])
    ) {
      return parts.slice(-3).join('.');
    }
    // otherwise, it's a subdomain (e.g. dub.vercel.app), so we return the last 2 parts
    return parts.slice(-2).join('.');
  }
  // if it's a normal domain (e.g. dub.sh), we return the domain
  return domain;
};

// Verify the URL entered by user
export const validDomainRegex = new RegExp(
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
);

// Get time link was added
export const timeAgo = (timestamp) => {
  if (!timestamp) return 'Just now';
  const diff = Date.now() - new Date(timestamp).getTime();
  if (diff < 60000) {
    // less than 1 second
    return 'Just now';
  } else if (diff > 82800000) {
    // more than 23 hours – similar to how Twitter displays timestamps
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year:
        new Date(timestamp).getFullYear() !== new Date().getFullYear()
          ? 'numeric'
          : undefined,
    });
  }
  return ms(diff);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// courtesy of chatgpt
export const getInitials = (name) => {
  const words = name.split(' ');
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join('');
};

export const signalIframe = () => {
  const iframe = document.getElementById('preview');
  if (iframe) {
    iframe.contentWindow.postMessage('', '*');
  }
};

export const removeHashFromHexColor = (hexColor) => {
  // Use a regular expression to match the # symbol at the beginning
  return hexColor.replace(/^#/, '');
};

export const getCurrentBaseURL = () => {
  if (typeof window !== 'undefined') {
    const baseURL = window.location.origin;
    return baseURL;
  }
};
