#!/bin/bash

echo '

  ____       _      _   _   _
 / ___|     / \    | | | | | |
 \___ \    / _ \   | | | | | |
  ___) |  / ___ \  | |_| | | |___
 |____/  /_/   \_\  \___/  |_____|

                                '

echo "--------- Startup Logs -----------"

echo "Exporting APP_SERVER from file"
export APP_SERVER=$(cat /env/app_server)

echo "Changing /system/servers/nginx/startupNginx.sh file to executable"
chmod +x /servers/python/startupPython.sh

if [ "$APP_SERVER" = 'python' ]; then
  echo "Python Server selected for Build"
  echo "Initiating startupPython.sh"
  /bin/bash -c /servers/python/startupPython.sh
else
  echo "Unknown APP_SERVER selected. No Server Started. No further actions."
fi