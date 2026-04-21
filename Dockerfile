ARG NODE_VERSION=20-bookworm-slim

FROM node:${NODE_VERSION} AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

FROM base AS dependencies

ENV HUSKY=0
ENV PRISMA_CLIENT_ENGINE_TYPE=library

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm ci --include=dev --legacy-peer-deps --no-audit --no-fund

FROM base AS builder

ENV NODE_ENV=production
ENV HUSKY=0
ENV PRISMA_CLIENT_ENGINE_TYPE=library

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate && npm run build

FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
ENV PRISMA_CLIENT_ENGINE_TYPE=library

RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next && chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/prisma ./prisma

USER node

EXPOSE 3000

CMD ["node", "server.js"]
