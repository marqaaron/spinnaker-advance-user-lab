# Build Related Arguments
appServer=python
version=local

# Server Related Arguments
serverDebug='true'

# App Related Arguments
appDebug='true'
baseDeckUrl="https://spinnaker.example.com"
baseGateUrl="https://spinnaker.example.com/api/v1"
authenticationEnabled='false'
rbacAdminView=''

# Local Environment Related Arguments
localPort=8082

help:
	@echo "Makefile Arguments:"
	@echo ""
	@echo "Build Related Arguments:"
	@echo "appServer (Default 'python'. Accepts only 'python')"
	@echo "version (Default 'local'. Production format 'v0.0.0')"
	@echo ""
	@echo "Server Related Arguments:"
	@echo "serverDebug (Default 'enabled')"
	@echo ""
	@echo "App Related Arguments:"
	@echo "appDebug (Default 'true')"
	@echo "baseDeckUrl (Default 'https://spinnaker.example.com')"
	@echo "baseGateUrl (Default 'https://spinnaker.example.com/api/v1')"
	@echo "authenticationEnabled (Default 'false')"
	@echo "rbacAdminView (Default '')"
	@echo ""
	@echo "Local Environment Related Arguments:"
	@echo "localPort (Default '8082')"
	@echo ""
	@echo "Make Commands:"
	@echo "build-local (Builds Docker Image locally for development)"
	@echo "run-local (Runs Docker Image locally for development)"
	@echo "dist-to-static (Copies contents of app/dist to servers/python/python_config/static then deletes app/dist)"


build-local:
	docker build \
	--build-arg APP_SERVER=${appServer} \
	--build-arg VERSION=${version} \
	-t spinnaker-saul \
	.

run-local:
	docker run -it -p ${localPort}:8082 \
    --env SERVER_DEBUG_MODE=${serverDebug} \
    --env DEBUG_MODE=${appDebug} \
    --env BASE_GATE_URL=${baseGateUrl} \
    --env BASE_DECK_URL=${baseDeckUrl} \
    --env AUTHENTICATION_ENABLED=${authenticationEnabled} \
    --env RBAC_ROLE_ADMIN_VIEW=${rbacAdminView} \
    --rm \
    --name spinnaker-saul \
    spinnaker-saul

dist-to-static:
	cp -r app/dist/ servers/python/python_config/static && rm -rf app/dist
