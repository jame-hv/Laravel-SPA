#!/bin/bash
set -e

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}===== Laravel Application Setup =====${NC}"

# Verify Docker and Docker Compose are available (but don't install them)
if ! [ -x "$(command -v docker)" ]; then
  echo -e "${RED}Docker is not installed. Please install Docker before continuing.${NC}"
  exit 1
fi

if ! [ -x "$(command -v docker-compose)" ]; then
  echo -e "${RED}Docker Compose is not installed. Please install Docker Compose before continuing.${NC}"
  exit 1
fi

echo -e "${GREEN}Docker and Docker Compose are available!${NC}"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
  cp .env.example .env
  echo -e "${GREEN}.env file created!${NC}"
else
  echo -e "${GREEN}.env file already exists!${NC}"
fi

# Set proper permissions for Laravel directories
echo -e "${YELLOW}Setting proper permissions for Laravel directories...${NC}"
mkdir -p storage/framework/cache/data
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p bootstrap/cache

chmod -R 775 storage bootstrap/cache
echo -e "${GREEN}Permissions set!${NC}"

# Start Docker containers
echo -e "${YELLOW}Starting Docker containers...${NC}"
docker-compose up -d
echo -e "${GREEN}Docker containers started!${NC}"

# Wait for services to be fully up
echo -e "${YELLOW}Waiting for services to be ready...${NC}"
sleep 10

# Execute commands in the app container
echo -e "${YELLOW}Installing PHP dependencies...${NC}"
docker-compose exec -T app composer install --no-interaction --optimize-autoloader

echo -e "${YELLOW}Generating application key...${NC}"
docker-compose exec -T app php artisan key:generate

# Optional database migration
read -p "Do you want to run database migrations? (y/n): " run_migration
if [[ $run_migration == "y" || $run_migration == "Y" ]]; then
  echo -e "${YELLOW}Running database migrations...${NC}"
  docker-compose exec -T app php artisan migrate --force
else
  echo -e "${YELLOW}Skipping database migrations...${NC}"
fi

echo -e "${YELLOW}Installing Node.js dependencies...${NC}"
docker-compose exec -T app npm install

echo -e "${YELLOW}Building frontend assets...${NC}"
docker-compose exec -T app npm run build

# Clear
echo -e "${YELLOW}Clearing cache...${NC}"
docker-compose exec -T app php artisan optimize:clear

echo -e "${GREEN}===== Setup Completed Successfully! =====${NC}"
echo -e "${GREEN}You can access your application at http://localhost${NC}"
