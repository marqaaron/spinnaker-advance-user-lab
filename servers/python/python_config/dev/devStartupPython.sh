echo "--------- Dev Python Logs -----------"

echo "Making /usr/src directory"
mkdir -p /usr/src

echo "Making /usr/src/app directory"
mkdir -p /usr/src/app

echo "Overwriting env.js"
cat > /usr/src/app/static/env.js << EOF
(function (window) {
  window.__env = window.__env || {};
  window.__env.BASE_DECK_URL = "${BASE_DECK_URL}" ? "${BASE_DECK_URL}" : "https://spinnaker.example.com" ;
  window.__env.BASE_GATE_URL = "${BASE_GATE_URL}" ? "${BASE_GATE_URL}" : "https://spinnaker.example.com/api/v1" ;
  window.__env.VERSION = "${VERSION}" ? "${VERSION}" : "none" ;
  window.__env.AUTHENTICATION_ENABLED = true ;
  window.__env.RBAC_ROLE_ADMIN_VIEW = "${RBAC_ROLE_ADMIN_VIEW}" ? "${RBAC_ROLE_ADMIN_VIEW}" : false;
  window.__env.DEBUG_MODE = "${DEBUG_MODE}" === 'true';
}(this));
EOF

echo "Bringing Up Python Web App saul.py"
python3 /usr/src/app/saul.py