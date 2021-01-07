#!/bin/bash

echo "--------- Saul Intermediate Logs -----------"

echo "Installing required packages"
apk add --no-cache git nodejs npm

echo "Moving into /app directory"
cd /system/app

echo "Removing existing node_modules if it exists"

rm -rf node_modules

echo "Installing npm modules"
npm ci

echo "Building Production App"
npm run build

echo "Removing node_modules"
rm -rf node_modules

echo "Changing Directory to /servers"
cd /system/servers

echo "Changing startup.sh file to executable"
chmod +x startup.sh