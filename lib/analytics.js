const LOCAL_LOCATION_FALLBACK = {
  countryCode: 'GH',
  city: 'Accra',
};

const FILTER_CONFIG = {
  last_hour: {
    bucketSizeMs: 5 * 60 * 1000,
    bucketCount: 12,
    format: 'time',
  },
  last_24_hours: {
    bucketSizeMs: 60 * 60 * 1000,
    bucketCount: 24,
    format: 'time',
  },
  last_7_days: {
    bucketSizeMs: 24 * 60 * 60 * 1000,
    bucketCount: 7,
    format: 'date',
  },
  last_30_days: {
    bucketSizeMs: 24 * 60 * 60 * 1000,
    bucketCount: 30,
    format: 'date',
  },
};

export function getAnalyticsRange(filter = 'last_hour') {
  return FILTER_CONFIG[filter] || FILTER_CONFIG.last_hour;
}

export async function listPageVisits(
  db,
  { userId, startDate, select, orderBy }
) {
  const requiresRawPageVisit = Object.prototype.hasOwnProperty.call(
    select || {},
    'referrer'
  );

  if (db.pageVisit?.findMany && !requiresRawPageVisit) {
    return db.pageVisit.findMany({
      where: {
        userId,
        ...(startDate
          ? {
              viewedAt: {
                gte: startDate,
              },
            }
          : {}),
      },
      select,
      orderBy,
    });
  }

  const result = await db.$runCommandRaw({
    find: 'PageVisit',
    filter: {
      userId: { $oid: userId },
      ...(startDate
        ? {
            viewedAt: {
              $gte: { $date: startDate.toISOString() },
            },
          }
        : {}),
    },
    projection: {
      _id: 0,
      ...Object.keys(select).reduce((projection, key) => {
        projection[key] = select[key] ? 1 : 0;
        return projection;
      }, {}),
    },
    ...(orderBy
      ? {
          sort: Object.entries(orderBy).reduce((sort, [key, direction]) => {
            sort[key] = direction === 'desc' ? -1 : 1;
            return sort;
          }, {}),
        }
      : {}),
  });

  return (result.cursor?.firstBatch || []).map(normalizeRawVisit);
}

export async function createPageVisit(
  db,
  { userId, location, city, device, referrer }
) {
  const requiresRawPageVisit = typeof referrer !== 'undefined';

  if (db.pageVisit?.create && !requiresRawPageVisit) {
    return db.pageVisit.create({
      data: {
        userId,
        location,
        city,
        device,
        referrer,
      },
    });
  }

  return db.$runCommandRaw({
    insert: 'PageVisit',
    documents: [
      {
        userId: { $oid: userId },
        viewedAt: { $date: new Date().toISOString() },
        location,
        city,
        device,
        referrer,
      },
    ],
  });
}

export async function listLinkClicks(db, { linkIds, startDate }) {
  if (!linkIds?.length) {
    return [];
  }

  if (db.linkClick?.findMany) {
    return db.linkClick.findMany({
      where: {
        linkId: {
          in: linkIds,
        },
        ...(startDate
          ? {
              clickedAt: {
                gte: startDate,
              },
            }
          : {}),
      },
      select: {
        linkId: true,
      },
    });
  }

  const result = await db.$runCommandRaw({
    find: 'LinkClick',
    filter: {
      linkId: {
        $in: linkIds.map((linkId) => ({ $oid: linkId })),
      },
      ...(startDate
        ? {
            clickedAt: {
              $gte: { $date: startDate.toISOString() },
            },
          }
        : {}),
    },
    projection: {
      _id: 0,
      linkId: 1,
    },
  });

  return result.cursor?.firstBatch || [];
}

export async function createLinkClick(db, { linkId }) {
  if (db.linkClick?.create) {
    return db.linkClick.create({
      data: {
        linkId,
      },
    });
  }

  return db.$runCommandRaw({
    insert: 'LinkClick',
    documents: [
      {
        linkId: { $oid: linkId },
        clickedAt: { $date: new Date().toISOString() },
      },
    ],
  });
}

export function buildTopLinks(links, linkClicks) {
  const clickCounts = new Map();

  for (const click of linkClicks) {
    clickCounts.set(click.linkId, (clickCounts.get(click.linkId) || 0) + 1);
  }

  return links
    .map((link) => ({
      ...link,
      clicks: clickCounts.get(link.id) || link.clicks || 0,
    }))
    .sort((left, right) => right.clicks - left.clicks);
}

export function buildVisitSeries(visits, filter) {
  const config = getAnalyticsRange(filter);
  const now = Date.now();
  const start = now - config.bucketSizeMs * (config.bucketCount - 1);
  const buckets = Array.from({ length: config.bucketCount }, (_, index) => {
    const time = new Date(start + index * config.bucketSizeMs);

    return {
      t: config.format === 'date' ? formatDate(time) : formatTime(time),
      visits: 0,
      bucketStart: time.getTime(),
    };
  });

  for (const visit of visits) {
    const viewedAt = new Date(visit.viewedAt).getTime();
    if (Number.isNaN(viewedAt) || viewedAt < start) {
      continue;
    }

    const bucketIndex = Math.floor((viewedAt - start) / config.bucketSizeMs);
    if (bucketIndex >= 0 && bucketIndex < buckets.length) {
      buckets[bucketIndex].visits += 1;
    }
  }

  return buckets.map(({ t, visits }) => ({ t, visits }));
}

export function countByKey(entries, key) {
  const counts = new Map();

  for (const entry of entries) {
    const value = entry[key];
    if (!value) {
      continue;
    }

    counts.set(value, (counts.get(value) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([value, visits]) => ({ [key]: value, visits }))
    .sort((left, right) => right.visits - left.visits);
}

export function getTrackedReferrer(req, browserReferrer, handle) {
  const headerReferrer = getHeader(req, 'referer');
  const referrer = normalizeReferrer(headerReferrer || browserReferrer, handle);

  return referrer || 'Direct';
}

export function getTrackedLocation(req, browserLocation = {}) {
  const headerCountry =
    getHeader(req, 'cf-ipcountry') || getHeader(req, 'x-vercel-ip-country');
  const headerCity =
    getHeader(req, 'cf-ipcity') || getHeader(req, 'x-vercel-ip-city');
  const browserCountry = normalizeCountryCode(browserLocation.countryCode);
  const browserCity = normalizeCity(browserLocation.city);
  const hostname = browserLocation.hostname;
  const isLocalHost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname?.endsWith('.local');

  const countryCode = normalizeCountryCode(headerCountry) || browserCountry;
  const city = normalizeCity(headerCity) || browserCity;

  if (countryCode || city) {
    return {
      location:
        countryCode ||
        (isLocalHost ? LOCAL_LOCATION_FALLBACK.countryCode : null),
      city: city || (isLocalHost ? LOCAL_LOCATION_FALLBACK.city : null),
    };
  }

  return isLocalHost
    ? {
        location: LOCAL_LOCATION_FALLBACK.countryCode,
        city: LOCAL_LOCATION_FALLBACK.city,
      }
    : {
        location: null,
        city: null,
      };
}

export function getTrackedDevice(req, browserDevice) {
  const mobileHint = getHeader(req, 'sec-ch-ua-mobile');
  const userAgent = (getHeader(req, 'user-agent') || '').toLowerCase();

  if (mobileHint === '?1' || /iphone|android.+mobile|mobile/.test(userAgent)) {
    return 'mobile';
  }

  if (/ipad|tablet|android(?!.*mobile)/.test(userAgent)) {
    return 'tablet';
  }

  if (mobileHint === '?0' || userAgent) {
    return 'desktop';
  }

  return normalizeDevice(browserDevice);
}

function getHeader(req, name) {
  const value = req.headers?.[name];
  return Array.isArray(value) ? value[0] : value;
}

function normalizeCountryCode(value) {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toUpperCase();
  if (!normalized || normalized === 'XX' || normalized === 'T1') {
    return null;
  }

  return normalized;
}

function normalizeCity(value) {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized || null;
}

function normalizeDevice(value) {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (
    normalized === 'mobile' ||
    normalized === 'tablet' ||
    normalized === 'desktop'
  ) {
    return normalized;
  }

  return null;
}

function normalizeRawVisit(visit) {
  return {
    ...visit,
    viewedAt: normalizeRawDate(visit.viewedAt),
  };
}

function normalizeReferrer(value, handle) {
  if (!value || typeof value !== 'string') {
    return null;
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, '').toLowerCase();
    const pathname = url.pathname.toLowerCase();

    if (
      pathname === `/${String(handle || '').toLowerCase()}` ||
      pathname.startsWith(`/admin`)
    ) {
      return null;
    }

    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.endsWith('.local')
    ) {
      return null;
    }

    return hostname || null;
  } catch {
    return null;
  }
}

function normalizeRawDate(value) {
  if (!value) {
    return value;
  }

  if (typeof value === 'string' || value instanceof Date) {
    return value;
  }

  if (typeof value === 'object' && '$date' in value) {
    return value.$date;
  }

  return value;
}

function formatDate(date) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${monthNames[date.getMonth()]} ${date.getDate()}`;
}

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amPM = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${amPM}`;
}
