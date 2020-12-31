#!/bin/bash

echo '
  ____       _      _   _   _
 / ___|     / \    | | | | | |
 \___ \    / _ \   | | | | | |
  ___) |  / ___ \  | |_| | | |___
 |____/  /_/   \_\  \___/  |_____|

                                '

echo "--------- Startup Logs -----------"

mkdir -p /var/log/nginx
mkdir -p /var/www/html

cp /app/build/nginx_config/nginx.conf /etc/nginx/nginx.conf
cp /app/build/nginx_config/default.conf /etc/nginx/conf.d/default.conf

export VUE_APP_VERSION=$(cat /app/build/scripts/version)

if [ -z "$VUE_APP_VERSION" ];
then
  echo "No VERSION Build Argument provided. Setting VUE_APP_VERSION to none"
  echo "VUE_APP_VERSION=none" >> /app/.env
else
  echo "VUE_APP_VERSION set as $VUE_APP_VERSION"
  echo "VUE_APP_VERSION=$VUE_APP_VERSION" >> /app/.env
fi

if [ -z "$BASE_GATE_URL" ];
then
  echo "No BASE_GATE_URL provided"
else
  echo "BASE_GATE_URL set as $BASE_GATE_URL"
  echo "VUE_APP_BASE_GATE_URL=$BASE_GATE_URL" >> /app/.env
fi

if [ -z "$BASE_DECK_URL" ];
then
  echo "No BASE_DECK_URL provided"
else
  echo "BASE_DECK_URL set as $BASE_DECK_URL"
  echo "VUE_APP_BASE_DECK_URL=$BASE_DECK_URL" >> /app/.env
fi

if [ -z "$APP_PATH" ];
then
  echo "No APP_PATH provided"
else
  echo "APP_PATH set as $APP_PATH"
  echo "VUE_APP_APP_PATH=$APP_PATH" >> /app/.env
fi

echo "Initiating Vue app build"
npm run build

echo "Initiating modifications to the Nginx web server config and moving Vue app build files"
if [ -z "$APP_PATH" ];
then
  echo "No APP_PATH provided. Modifying Nginx config to host from root"
  sed -i "s|routePath|/|g" /etc/nginx/conf.d/default.conf
  sed -i "s|tryFilesDirectory||g" /etc/nginx/conf.d/default.conf
  echo "Moving build files from /app/dist to /var/www/html"
  cp -r /app/dist/* /var/www/html
else
  echo "APP_PATH set as $APP_PATH. Modifying Nginx config to host from $APP_PATH"
  sed -i "s|routePath|/$APP_PATH|g" /etc/nginx/conf.d/default.conf
  sed -i "s|tryFilesDirectory|/$APP_PATH|g" /etc/nginx/conf.d/default.conf
  echo "Creating /var/www/html/$APP_PATH"
  mkdir /var/www/html/$APP_PATH
  echo "Moving build files from /app/dist to /var/www/html/$APP_PATH"
  cp -r /app/dist/* /var/www/html/$APP_PATH
fi

rm -rf /app/node_modules

echo "Making nginx user owner of /var/www/html directory"
chown nginx:nginx /var/www/html

echo "Bringing up Nginx web server"
echo "--------- Startup Complete -----------"

nginx -g 'daemon off;'