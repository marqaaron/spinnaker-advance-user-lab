#!/bin/bash

echo "--------- Saul Intermediate Logs -----------"

echo "Installing required packages"
apk add --no-cache git nodejs npm

echo "Moving into /app directory"
cd /ui/app

echo "Removing existing node_modules if it exists"

rm -rf node_modules

echo "Installing npm modules"
npm ci

echo "Building Production App"
npm run build

echo "Removing node_modules"
rm -rf node_modules