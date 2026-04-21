import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '@/lib/db';

const githubClientId =
  process.env.GITHUB_CLIENT_ID || process.env.DEV_GITHUB_CLIENT_ID;
const githubClientSecret =
  process.env.GITHUB_CLIENT_SECRET || process.env.DEV_GITHUB_CLIENT_SECRET;

const socialProviders = {
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {}),
  ...(githubClientId && githubClientSecret
    ? {
        github: {
          clientId: githubClientId,
          clientSecret: githubClientSecret,
        },
      }
    : {}),
};

const trustedProviders = Object.keys(socialProviders);

export const auth = betterAuth({
  appName: 'Librelinks',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  trustedOrigins: [
    'https://librelinks-mu.vercel.app',
    'https://links.urdadx.com',
  ],
  database: prismaAdapter(db, {
    provider: 'mongodb',
  }),
  socialProviders,
  user: {
    modelName: 'user',
    fields: {
      emailVerified: 'betterAuthEmailVerified',
    },
  },
  session: {
    modelName: 'session',
  },
  account: {
    modelName: 'account',
    fields: {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      idToken: 'id_token',
    },
    accountLinking: {
      enabled: true,
      trustedProviders,
    },
  },
  verification: {
    modelName: 'verification',
  },
  advanced: {
    database: {
      generateId: ({ model }) => {
        if (model === 'user') {
          return false;
        }

        return undefined;
      },
    },
  },
});
