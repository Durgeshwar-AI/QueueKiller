# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install build tools needed for native module compilation
RUN apk add --no-cache make g++ python3

# Copy package management files
COPY package*.json ./
COPY prisma ./prisma

# Install ALL dependencies for building (including dev dependencies)
RUN npm install

# Copy source code and config
COPY . .

# Generate Prisma client and build TypeScript
RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Copy production files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/dist ./dist

# Install ONLY production dependencies
RUN npm ci --omit=dev

# The generated prisma client is in dist/ since it was in src/ generated
# But we might need the engine from node_modules if it's not bundled.
# npm ci --omit=dev will install @prisma/client which handles the engine.

EXPOSE 8000

CMD ["npm", "start"]