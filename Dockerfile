# Base stage - common dependencies
FROM node:21-alpine AS base
WORKDIR /app
COPY package*.json ./

# Build stage - compile TypeScript
FROM base AS build
RUN npm install
COPY . .
RUN npm run build

# Development stage
FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
