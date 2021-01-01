#!/bin/bash

echo '

  ____       _      _   _   _
 / ___|     / \    | | | | | |
 \___ \    / _ \   | | | | | |
  ___) |  / ___ \  | |_| | | |___
 |____/  /_/   \_\  \___/  |_____|

                                '

echo "--------- Startup Logs -----------"

echo "Making /var/log/nginx directory"
mkdir -p /var/log/nginx

echo "Making /var/www/html directory"
mkdir -p /var/www/html

echo "Making /var/www/html/saul directory"
mkdir -p /var/www/html/saul

echo "Moving Nginx Config files"
mv /app/build/nginx_config/nginx.conf /etc/nginx/nginx.conf
mv /app/build/nginx_config/default.conf /etc/nginx/conf.d/default.conf

echo "Exporting VERSION from file"
export VERSION=$(cat /app/build/scripts/version)

echo "Moving build files from /app/dist to /var/www/html/saul"
mv /app/dist/* /var/www/html/saul

echo "Overwriting env.js"
cat > /var/www/html/saul/env.js << EOF
(function (window) {
  window.__env = window.__env || {};
  window.__env.BASE_DECK_URL = "${BASE_DECK_URL}" ? "${BASE_DECK_URL}" : "https://spinnaker.example.com" ;
  window.__env.BASE_GATE_URL = "${BASE_GATE_URL}" ? "${BASE_GATE_URL}" : "https://spinnaker.example.com/api/v1" ;
  window.__env.VERSION = "${VERSION}" ? "${VERSION}" : "none" ;
  window.__env.AUTHENTICATION_ENABLED = true ;
}(this));
EOF

echo "Making nginx user owner of /var/www/html directory"
chown nginx:nginx /var/www/html

echo "Bringing up Nginx web server"
echo "--------- Startup Complete -----------"

nginx -g 'daemon off;'