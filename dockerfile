# Use an official Node.js image as the base image
FROM node:20-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 80
EXPOSE 3000

# Start the Nginx server
CMD ["npm", "run", "dev"]