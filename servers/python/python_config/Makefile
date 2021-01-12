# Build Related Arguments
appServer=python
version=local-python-mockdata

# Run Related Arguments
topDirectory=$(PWD)

# Server Related Arguments
serverDebug='true'

# App Related Arguments
appDebug='true'
baseDeckUrl="https://spinnaker.example.com"
baseGateUrl="https://spinnaker.example.com/api/v1"
authenticationEnabled='true'
rbacAdminView=''

# Local Environment Related Arguments
localPort=8082

help:
	@echo "Makefile Arguments:"
	@echo ""
	@echo "Build Related Arguments:"
	@echo "appServer (Default 'python'. Only accepts 'python' for now.)"
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


build-local:
	docker build \
	--build-arg APP_SERVER=${appServer} \
	--build-arg VERSION=${version} \
	-t saul-python \
	.

run-local:
	docker run -it -p ${localPort}:8082 \
    --env SERVER_DEBUG_MODE=${serverDebug} \
    --env DEBUG_MODE=${appDebug} \
    --env BASE_GATE_URL=${baseGateUrl} \
    --env BASE_DECK_URL=${baseDeckUrl} \
    --env AUTHENTICATION_ENABLED=${authenticationEnabled} \
    --env RBAC_ROLE_ADMIN_VIEW=${rbacAdminView} \
    --env VERSION=${version} \
    --rm \
    -v ${topDirectory}:/usr/src/app \
    --name saul-python \
    saul-python
