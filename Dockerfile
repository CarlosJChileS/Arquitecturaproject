FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
