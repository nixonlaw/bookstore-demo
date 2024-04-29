FROM node:18-alpine 

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN apk --no-cache add curl

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Build the Nuxt.js application
RUN npm run build

# Expose the application port
EXPOSE 80

# Start the application
CMD [ "npm", "start" ]