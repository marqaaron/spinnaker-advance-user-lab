#!/bin/bash

echo "--------- Base Image Logs -----------"

echo "Installing required packages"
apk add --no-cache python3 py3-pip

if [ "$APP_SERVER" = 'python' ]; then
  echo "Installing required python packages"
  pip install --no-cache-dir -r /servers/python/python_config/requirements.txt
else
  echo "Unknown APP_SERVER selected. No Server Started. No further actions."
fi

echo "Moving to root directory"
cd /

echo "Changing /build/saulintermediate.sh file to executable"
chmod +x /build/saulintermediate.sh

echo "Changing /servers/startup.sh file to executable"
chmod +x /servers/startup.sh

echo "Creating /env directory and moving to it"
mkdir env && cd /env

echo "Saving VERSION environment variable to text file for later"
echo ${VERSION} > version && chmod +rw version

echo "Saving APP_SERVER environment variable to text file for later"
echo ${APP_SERVER} > app_server && chmod +rw version