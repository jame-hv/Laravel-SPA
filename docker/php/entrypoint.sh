#!/bin/bash

echo "🔧 Fixing Laravel permissions..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "🚀 Starting PHP-FPM..."
exec "$@"
