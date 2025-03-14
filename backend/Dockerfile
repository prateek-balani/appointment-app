# Use a Node.js base image
FROM node:18.9.1

# Set working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install SQLite CLI (for sqlite3 command line, if needed)
RUN apt-get update && apt-get install -y sqlite3 && apt-get clean

# Force install dependencies (build native modules inside container)
RUN npm install --build-from-source --force

# Copy application files
COPY . .

# Create a directory for SQLite database files
RUN mkdir -p /backend/data

# Expose the application port
EXPOSE 5050

# Command to start the application
CMD ["npm", "start"]
