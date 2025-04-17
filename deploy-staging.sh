#!/bin/bash
set -e

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}===== Zero Downtime Deployment to Staging Environment =====${NC}"

# Set environment variables for staging
export APP_ENV=staging
export APP_DEBUG=false

# Determine current and new environment color (blue/green)
CURRENT_ENV=$(docker ps --filter "name=${APP_NAME}_app_stg" --format "{{.Names}}" | grep -E "${APP_NAME}_app_stg_(blue|green)" || echo "${APP_NAME}_app_stg_blue")

if [[ $CURRENT_ENV == *"blue"* ]]; then
  CURRENT_COLOR="blue"
  NEW_COLOR="green"
else
  CURRENT_COLOR="green"
  NEW_COLOR="blue"
fi

echo -e "${BLUE}Current environment: ${CURRENT_COLOR}${NC}"
echo -e "${BLUE}Deploying to: ${NEW_COLOR}${NC}"

# Pull the latest code from the repository
echo -e "${YELLOW}Pulling latest code from repository...${NC}"
git pull origin staging

# Copy the staging environment file
echo -e "${YELLOW}Setting up staging environment...${NC}"
cp .env.staging .env

# Create or update the new environment
echo -e "${YELLOW}Building new ${NEW_COLOR} environment...${NC}"
export APP_NAME_COLOR="${APP_NAME}_${NEW_COLOR}"
export CONTAINER_NAME="${APP_NAME}_app_stg_${NEW_COLOR}"

# Modify docker compose.staging.yaml to use the new container name
sed "s/container_name: \${APP_NAME}_app_stg/container_name: ${CONTAINER_NAME}/g" docker compose.staging.yaml > docker compose.staging.${NEW_COLOR}.yaml

# Build and start the new environment
echo -e "${YELLOW}Building Docker images for ${NEW_COLOR} environment...${NC}"
docker compose -f docker compose.staging.${NEW_COLOR}.yaml build --no-cache

echo -e "${YELLOW}Starting ${NEW_COLOR} Docker containers...${NC}"
docker compose -f docker compose.staging.${NEW_COLOR}.yaml up -d

# Wait for services to be fully up
echo -e "${YELLOW}Waiting for ${NEW_COLOR} services to be ready...${NC}"
sleep 10

# Execute commands in the new app container
echo -e "${YELLOW}Installing PHP dependencies...${NC}"
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} composer install --no-interaction --no-dev --optimize-autoloader

# Run database migrations
echo -e "${YELLOW}Running database migrations...${NC}"
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} php artisan migrate --force

# Install frontend dependencies
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} npm ci

# Build frontend assets for production
echo -e "${YELLOW}Building frontend assets...${NC}"
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} npm run build

# Optimize Laravel
echo -e "${YELLOW}Optimizing Laravel...${NC}"
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} php artisan optimize
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} php artisan config:cache
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} php artisan route:cache
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} php artisan view:cache

# Set proper permissions
echo -e "${YELLOW}Setting proper permissions...${NC}"
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} chown -R www-data:www-data storage bootstrap/cache
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} chmod -R 775 storage bootstrap/cache

# Restart Laravel queue workers if using them
echo -e "${YELLOW}Restarting queue workers...${NC}"
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} php artisan queue:restart

# Run any final deployment tasks
echo -e "${YELLOW}Running deployment tasks...${NC}"
docker compose -f docker compose.staging.${NEW_COLOR}.yaml exec -T ${CONTAINER_NAME} php artisan deploy:finalize

# Perform smoke test on the new environment
NEW_PORT=$(docker port ${CONTAINER_NAME} 9000/tcp | cut -d ':' -f2)

echo -e "${YELLOW}Performing health check on new environment...${NC}"
if ! curl -s "http://localhost:${NEW_PORT}/health" | grep -q "ok"; then
  echo -e "${RED}Health check failed! Rolling back to ${CURRENT_COLOR} environment.${NC}"
  docker compose -f docker compose.staging.${NEW_COLOR}.yaml down
  exit 1
fi

# Update Nginx configuration to point to the new environment
echo -e "${YELLOW}Updating Nginx configuration to point to new ${NEW_COLOR} environment...${NC}"
# Update Nginx upstream configuration to point to the new container's port
sed -i "s/server 127.0.0.1:[0-9]*/server 127.0.0.1:${NEW_PORT}/" /etc/nginx/conf.d/laravel-upstream.conf

# Reload Nginx to apply the changes
echo -e "${YELLOW}Reloading Nginx configuration...${NC}"
sudo systemctl reload nginx

echo -e "${GREEN}New ${NEW_COLOR} environment is now live!${NC}"

# Wait to ensure everything is stable with the new environment
echo -e "${YELLOW}Waiting to ensure stability with new environment...${NC}"
sleep 30

# If we got here, the new environment is working properly
# Shut down the old environment
if docker ps --filter "name=${APP_NAME}_app_stg_${CURRENT_COLOR}" | grep -q "${CURRENT_COLOR}"; then
  echo -e "${YELLOW}Shutting down old ${CURRENT_COLOR} environment...${NC}"
  docker compose -f docker compose.staging.${CURRENT_COLOR}.yaml down
fi

echo -e "${GREEN}===== Zero Downtime Deployment to Staging Completed Successfully! =====${NC}"
echo -e "${GREEN}The application is now available at your staging URL using the ${NEW_COLOR} environment${NC}"

# Optional: Send notification about successful deployment
# slack-notify "Laravel SPA has been deployed to staging successfully using ${NEW_COLOR} environment!"
