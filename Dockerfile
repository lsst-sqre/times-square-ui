# Stage 1: Install dependencies ===============================================
FROM node:16-alpine AS deps

# If necessary, add libc6-compat (e.g. for process.dlopen)
RUN apk add --no-cache libc6-compat

# GitHub Personal Access token to install from GitHub Packages
# Needs:
# 'repo', 'write:packages', and 'read:packages'
ARG GH_PKG_TOKEN

WORKDIR /app

# .npmrc is not copied into the "producer" docker image
RUN echo "//npm.pkg.github.com/:_authToken=${GH_PKG_TOKEN}" > ~/.npmrc

COPY package.json package-lock.json .npmrc ./
RUN npm ci


# Stage 2: Build application ==================================================
FROM node:16-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Install pre-built app and deps for production ======================
FROM node:16-alpine as production

WORKDIR /app
ENV NODE_ENV production
# Disable next.js telemtry in run-time
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/times-square.config.schema.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]
