# Use Node.js 18 LTS (Alpine for smaller image)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Expose Next.js dev server port
EXPOSE 3000

# Install dependencies and run dev server
CMD npm install && npm run dev