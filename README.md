# Laravel SPA

A personal template built with Laravel, React, TypeScript, and Tailwind CSS. This project provides a development environment with Docker.

## 🚀 Tech Stack

-   **Backend**: Laravel 12+
-   **Frontend**: React 18 with TypeScript
-   **CSS Framework**: Tailwind CSS 4
-   **UI Components**: Shadcn UI
-   **PHP Version**: 8.2
-   **Database**: MySQL 8.0
-   **Build Tool**: Vite 6
-   **API Communication**: Inertia.js & Axios
-   **Container**: Docker with PHP-FPM, Nginx, MySQL

## ✨ Features

-   ⚡️ Full Docker setup with PHP-FPM, Nginx, MySQL, and PHPMyAdmin
-   🔐 Authentication system ready to use
-   🌐 Internationalization support (English and Japanese)
-   📱 Responsive design with Tailwind CSS and ShadcnUI
-   🖥️ TypeScript for better developer experience
-   📦 Modern frontend tooling with Vite
-   🧩 Component-based architecture

## 📋 Prerequisites

-   [Docker](https://www.docker.com/get-started) and Docker Compose
-   Git

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd laravel-spa
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

### 3. Start Docker containers

```bash
docker-compose up -d
```

This will start all services defined in docker-compose.yaml:

-   PHP application (`app`)
-   Nginx web server (`webserver`)
-   MySQL database (`mysql`)
-   PHPMyAdmin (`phpmyadmin`)

### 4. Access the app container bash shell

```bash
docker-compose exec app bash
```

Once inside the container shell, you can run the following commands:

### 5. Install PHP dependencies

```bash
composer install
```

### 6. Generate application key

```bash
php artisan key:generate
```

### 7. Run database migrations

```bash
php artisan migrate
```

### 8. Seed the database (optional)

```bash
php artisan db:seed
```

### 9. Install frontend dependencies

```bash
npm install
```

### 10. Build frontend assets or start development server

For development:

```bash
npm run dev
```

For production build:

```bash
npm run build
```

When you're done, you can exit the container shell by typing `exit`.

## 🌐 Accessing the Application

-   **Laravel Application**: [http://localhost](http://localhost)
-   **PHPMyAdmin**: [http://localhost:8081](http://localhost:8081)
    -   Server: mysql
    -   Username: admin (from .env)
    -   Password: changeme (from .env)
-   **Vite Dev Server**: [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
├── app                  # Laravel application code
│   ├── Http             # Controllers, Middleware, Requests
│   ├── Models           # Database models
│   └── Providers        # Service providers
├── config               # Configuration files
├── database             # Migrations, seeders, factories
├── docker               # Docker configuration
│   ├── mysql            # MySQL configuration
│   ├── nginx            # Nginx configuration
│   └── php              # PHP configuration and Dockerfile
├── resources            # Frontend resources
│   ├── css              # CSS files
│   ├── js               # TypeScript/React components
│   │   ├── Components   # Reusable UI components
│   │   ├── Pages        # Page components
│   │   └── Layouts      # Layout components
│   └── views            # Blade templates
├── routes               # Laravel routes
└── tests                # Test files
```

## 🧑‍💻 Development Workflow

1. Make changes to your code
2. For frontend changes, the Vite dev server will automatically refresh
3. For backend changes, they will be immediately available due to volume mounting

## 🔧 Useful Commands

```bash
# Restart containers
docker compose restart

# View container logs
docker compose logs -f

# Access MySQL CLI
docker-compose exec mysql mysql -u admin -p
```

## 📚 Additional Resources

-   [Laravel Documentation](https://laravel.com/docs)
-   [React Documentation](https://reactjs.org/docs/getting-started.html)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [Docker Documentation](https://docs.docker.com/)
