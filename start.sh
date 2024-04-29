#!/bin/bash

# Stop and remove existing containers (if any)
docker-compose down

# Build the Docker images
docker-compose build --no-cache

# Start the containers in detached mode
docker-compose up -d