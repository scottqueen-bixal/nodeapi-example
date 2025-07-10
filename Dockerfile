# Use the official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Define environment variable
ENV NODE_ENV=production

# Install dotenv for environment variable support
RUN npm install dotenv

# Use build arg for PORT with default value
ARG PORT=8000
ENV PORT=${PORT}

# Expose the port dynamically
EXPOSE ${PORT}

# Command to run the application with dotenv support
CMD ["node", "-r", "dotenv/config", "app.js"]
