# Use Node.js image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
