# Multi-stage build for React Native Web + Ollama AI
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY babel.config.js ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build for web
RUN npx expo export:web

# Production stage with Ollama
FROM alpine:latest

# Install required packages
RUN apk add --no-cache \
    nodejs \
    npm \
    nginx \
    supervisor \
    curl \
    bash

# Install Ollama
RUN curl -fsSL https://ollama.ai/install.sh | sh

# Create app directory
WORKDIR /app

# Copy built web files
COPY --from=build /app/web-build /usr/share/nginx/html

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy supervisor configuration
COPY docker/supervisord.conf /etc/supervisord.conf

# Create ollama service user
RUN adduser -D -s /bin/bash ollama

# Create directories
RUN mkdir -p /home/ollama/.ollama \
    && chown -R ollama:ollama /home/ollama/.ollama

# Copy startup script
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

# Expose ports
EXPOSE 80 11434

# Start services
CMD ["/start.sh"]
