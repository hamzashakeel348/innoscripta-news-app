# Use the official Node.js image as the base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev"]
