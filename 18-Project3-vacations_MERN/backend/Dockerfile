# Use the official Node.js image from Docker Hub
FROM node:20.14-alpine
# Set the working directory inside the container
WORKDIR /app
# Copy the package.json and package-lock.json files to the working directory
COPY package*.json .
# Install the dependencies
RUN npm install
# Copy the rest of the application files to the working directory
COPY . .
# Expose the port the app runs on
EXPOSE 8000
# Run the app
CMD npm run dev