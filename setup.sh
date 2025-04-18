#!/bin/bash

# Color variables
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print section header
print_section() {
    echo -e "\n${BLUE}=== $1 ===${NC}\n"
}

# Print success message
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Print info message
print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Print error message
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_section "Checking Prerequisites"

    local prerequisite_missing=false

    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker: https://www.docker.com/get-started"
        prerequisite_missing=true
    else
        print_success "Docker is installed"
    fi

    if ! command_exists docker-compose; then
        print_error "Docker Compose is not installed. Please install Docker Compose."
        prerequisite_missing=true
    else
        print_success "Docker Compose is installed"
    fi

    if [ "$prerequisite_missing" = true ]; then
        print_error "Please install the missing prerequisites and run this script again."
        exit 1
    fi
}

# Setup environment
setup_environment() {
    print_section "Setting up environment"

    if [ ! -f .env ]; then
        print_info "Creating .env file from .env.example"
        cp .env.example .env
        print_success "Created .env file"
    else
        print_info ".env file already exists"
    fi
}

# Start Docker containers
start_docker() {
    print_section "Starting Docker containers"

    print_info "Building and starting containers (this may take a while)..."
    if docker-compose up -d; then
        print_success "Docker containers started successfully"
    else
        print_error "Failed to start Docker containers"
        exit 1
    fi
}

# Install PHP dependencies
install_php_dependencies() {
    print_section "Installing PHP dependencies"

    print_info "Running composer install in the container..."
    if docker-compose exec -T app composer install; then
        print_success "PHP dependencies installed successfully"
    else
        print_error "Failed to install PHP dependencies"
        exit 1
    fi
}

# Generate application key
generate_app_key() {
    print_section "Generating application key"

    print_info "Running artisan key:generate in the container..."
    if docker-compose exec -T app php artisan key:generate --ansi; then
        print_success "Application key generated successfully"
    else
        print_error "Failed to generate application key"
        exit 1
    fi
}

# Run database migrations
run_migrations() {
    print_section "Running database migrations"

    read -p "Do you want to run database migrations? (y/n): " migrate_choice
    if [[ $migrate_choice == "y" || $migrate_choice == "Y" ]]; then
        print_info "Running artisan migrate in the container..."
        if docker-compose exec -T app php artisan migrate; then
            print_success "Database migrations completed successfully"
        else
            print_error "Failed to run database migrations"
            exit 1
        fi
    else
        print_info "Skipping database migrations"
    fi
}

# Seed the database
seed_database() {
    print_section "Seeding the database"

    read -p "Do you want to seed the database? (y/n): " seed_choice
    if [[ $seed_choice == "y" || $seed_choice == "Y" ]]; then
        print_info "Running artisan db:seed in the container..."
        if docker-compose exec -T app php artisan db:seed; then
            print_success "Database seeded successfully"
        else
            print_error "Failed to seed the database"
            exit 1
        fi
    else
        print_info "Skipping database seeding"
    fi
}

# Install frontend dependencies
install_frontend_dependencies() {
    print_section "Installing frontend dependencies"

    print_info "Installing frontend dependencies using PNPM..."
    if docker-compose exec -T app pnpm install; then
        print_success "Frontend dependencies installed successfully"

    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
}

# Build frontend assets
build_frontend_assets() {
    print_section "Building frontend assets"

    read -p "Do you want to build for production or run in development mode? (prod/dev): " build_choice

    if [[ $build_choice == "prod" || $build_choice == "production" ]]; then
        print_info "Building frontend assets for production..."
        if docker-compose exec -T app pnpm run build; then
            print_success "Frontend assets built successfully for production"
        else
            print_error "Failed to build frontend assets"
            exit 1
        fi
    else
        print_info "Starting frontend development server..."
        print_info "Press Ctrl+C to stop the development server when done."
        if docker-compose exec app pnpm run dev; then
            print_success "Frontend development server stopped"
        else
            print_error "Failed to start frontend development server"
            exit 1
        fi
    fi
}

# Display access information
display_access_info() {
    print_section "Access Information"

    echo -e "Your Laravel SPA application is now set up and ready to use!"
    echo -e "\n${YELLOW}Application URLs:${NC}"
    echo -e "- Laravel Application: ${GREEN}http://localhost${NC}"
    echo -e "- PHPMyAdmin: ${GREEN}http://localhost:8081${NC}"
    echo -e "  - Server: mysql"
    echo -e "  - Username: admin (from .env)"
    echo -e "  - Password: changeme (from .env)"
    echo -e "- Vite Dev Server (if running): ${GREEN}http://localhost:5173${NC}"

    echo -e "\n${YELLOW}Useful commands:${NC}"
    echo -e "- Docker Container Shell: ${GREEN}docker-compose exec app bash${NC}"
    echo -e "- Restart Containers: ${GREEN}docker-compose restart${NC}"
    echo -e "- View Logs: ${GREEN}docker-compose logs -f${NC}"
}

# Main script execution
echo -e "${BLUE}==============================================${NC}"
echo -e "${BLUE}   Laravel SPA Setup Script                  ${NC}"
echo -e "${BLUE}==============================================${NC}"

# Run the setup steps
check_prerequisites
setup_environment
start_docker
install_php_dependencies
generate_app_key
run_migrations
seed_database
install_frontend_dependencies
build_frontend_assets
display_access_info

echo -e "\n${GREEN}Setup completed successfully!${NC}"
