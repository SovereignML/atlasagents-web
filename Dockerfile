# Atlas Agents marketing site — portable image built on Next's `output: "standalone"`
# (see next.config.ts). Deploys to any container host; Vercel ignores this file and
# builds from source as usual.
#
#   docker build -t atlasagents-web .
#   docker run --rm -p 3002:3000 --env-file .env atlasagents-web

# ─── deps ────────────────────────────────────────────────────────────────────
FROM node:24-alpine AS deps
WORKDIR /app
# `npm ci` needs both files; .npmrc pins legacy-peer-deps=false so the lockfile
# is honored exactly.
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# ─── build ───────────────────────────────────────────────────────────────────
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* are inlined at build time, so they must be present here — not
# only at runtime. Defaults match .env.example; override with --build-arg.
ARG NEXT_PUBLIC_SITE_URL="https://atlasagents.dev"
ARG NEXT_PUBLIC_APP_URL="https://app.atlasagents.dev"
ARG NEXT_PUBLIC_POSTHOG_KEY=""
ARG NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY \
    NEXT_PUBLIC_POSTHOG_HOST=$NEXT_PUBLIC_POSTHOG_HOST \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ─── runner ──────────────────────────────────────────────────────────────────
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# The standalone bundle ships its own minimal node_modules; static assets and
# /public are NOT included in it and must be copied alongside.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
