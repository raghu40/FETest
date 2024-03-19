# Use official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

RUN npm install -g @angular/cli

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Command to run the app
CMD ["ng", "serve", "--host", "0.0.0.0"]
