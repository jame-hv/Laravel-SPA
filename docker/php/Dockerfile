FROM php:8.2-fpm

WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zip unzip curl git \
    libzip-dev \
    libonig-dev \
    libicu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo_mysql mbstring zip exif pcntl bcmath opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Install node
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g


# Custom PHP config
COPY local.ini /usr/local/etc/php/conf.d/local.ini

# Entrypoint
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]
