# Build Related Arguments
appServer=python
version=local-python-mockdata

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
	@echo "appServer (Default 'python'. Accepts either 'python' or 'nginx')"
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
	@echo "run-local-mount (Runs Docker Image locally with python_config directory mounted for development)"


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
    --rm \
    --name saul-python \
    saul-python

run-local-mount:
	docker run -it -p ${localPort}:8082 \
    --env SERVER_DEBUG_MODE=${serverDebug} \
    --env DEBUG_MODE=${appDebug} \
    --env BASE_GATE_URL=${baseGateUrl} \
    --env BASE_DECK_URL=${baseDeckUrl} \
    --env AUTHENTICATION_ENABLED=${authenticationEnabled} \
    --env RBAC_ROLE_ADMIN_VIEW=${rbacAdminView} \
    --rm \
    -v ~/Repositories/saul/servers/python/python_config:/usr/src/app \
    --name saul-python \
    saul-python
