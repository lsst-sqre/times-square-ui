# Stage 1: Build the application
FROM node:16-alpine AS builder

# If necessary, add libc6-compat (e.g. for process.dlopen)
# apk add --no-cache libc6-compat

# GitHub Personal Access token to install from GitHub Packages
# Needs:
# 'repo', 'write:packages', and 'read:packages'
ARG GH_PKG_TOKEN

WORKDIR /app

RUN echo "//npm.pkg.github.com/:_authToken=${GH_PKG_TOKEN}" > ~/.npmrc

COPY package.json package-lock.json .npmrc ./
RUN npm install

COPY . .

RUN npm run build
RUN npm install --production


# Stage 2: Install pre-built app and deps for production
FROM node:16-alpine as production

WORKDIR /app
ENV NODE_ENV production

# COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

CMD ["npm", "run start"]
