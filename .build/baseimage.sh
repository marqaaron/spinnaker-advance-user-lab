#!/bin/bash

echo "--------- Base Image Logs -----------"

echo "Installing required packages"
apk add --no-cache nginx python3 py3-pip

echo "Moving to root directory"
cd /

echo "Changing /build/saulintermediate.sh file to executable"
chmod +x /build/saulintermediate.sh

echo "Creating /env directory and moving to it"
mkdir env && cd /env

echo "Saving VERSION environment variable to text file for later"
echo ${VERSION} > version && chmod +rw version

echo "Saving APP_SERVER environment variable to text file for later"
echo ${APP_SERVER} > app_server && chmod +rw version