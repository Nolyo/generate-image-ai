# Dockerfile

# Build stage
FROM node:18 AS builder

WORKDIR /app

# Copy package files
COPY ./app/package*.json ./

# Install pnpm
RUN npm i -g pnpm

# Install all dependencies (including devDependencies for build)
RUN pnpm install --prod=false

# Copy application files
COPY ./app/ .

# Build the React application
RUN pnpm run build

# Production stage
FROM node:18-slim

WORKDIR /app

# Copy package files
COPY ./app/package*.json ./

# Install pnpm
RUN npm i -g pnpm

# Install only production dependencies
RUN pnpm install --prod

# Copy server files
COPY ./app/server ./server

# Copy built React app from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3001 (Express server)
EXPOSE 3001

# Set NODE_ENV to production
ENV NODE_ENV=production

# Start the Express server
CMD ["pnpm", "start"]
