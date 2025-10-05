# Use Node.js 18 LTS (Alpine for smaller image)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Expose Next.js dev server port
EXPOSE 3000

# Default command (dev mode with hot reload)
CMD ["npm", "run", "dev"]