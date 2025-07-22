# Build frontend
FROM node:18-slim AS frontend
WORKDIR /app/frontend
COPY api-gateway/public/package*.json ./
RUN npm ci
COPY api-gateway/public ./
RUN npm run build

# Backend stage
FROM node:18-slim
WORKDIR /usr/src/app

# Install backend dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy backend source code
COPY . .

# Copy frontend build
COPY --from=frontend /app/frontend/dist api-gateway/public/dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
