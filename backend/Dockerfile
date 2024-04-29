FROM node:18-alpine 

# Set the working directory inside the container
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=5120"

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Copy the rest of the application code to the container
COPY . .

# Install dependencies
RUN npm install

# Build the TypeScript code
RUN npm run build

# Expose the port on which the application will run
EXPOSE 8081

# Start the application
CMD ["npm", "run", "start"]