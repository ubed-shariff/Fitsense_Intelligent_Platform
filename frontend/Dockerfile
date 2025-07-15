# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and optionally package-lock.json to the working directory
COPY package.json ./

# Install app dependencies
# ADD THIS IF NEEDED: install MUI icons (if not listed in package.json)
RUN npm install @mui/icons-material

# Install rest of the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the frontend port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
