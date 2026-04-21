const rateLimitStore = global.__librelinksRateLimitStore || new Map();

if (!global.__librelinksRateLimitStore) {
  global.__librelinksRateLimitStore = rateLimitStore;
}

export function getRequestIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0]?.split(',')[0]?.trim() || 'unknown';
  }

  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = req.headers['x-real-ip'];

  if (Array.isArray(realIp)) {
    return realIp[0] || 'unknown';
  }

  if (typeof realIp === 'string') {
    return realIp;
  }

  return req.socket?.remoteAddress || 'unknown';
}

export function enforceRateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}
