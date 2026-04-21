FROM node:20-bookworm-slim AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

FROM base AS deps

ENV HUSKY=0
ENV PRISMA_CLIENT_ENGINE_TYPE=library

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --legacy-peer-deps --no-audit --no-fund && npx prisma generate

FROM base AS builder

ENV NODE_ENV=production
ENV HUSKY=0
ENV PRISMA_CLIENT_ENGINE_TYPE=library

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV HUSKY=0
ENV PRISMA_CLIENT_ENGINE_TYPE=library

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --include=dev --legacy-peer-deps --no-audit --no-fund && npx prisma generate && npm prune --omit=dev --legacy-peer-deps && npm cache clean --force

COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/next.config.js ./next.config.js

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["sh", "-c", "NODE_ENV=production npm start"]
