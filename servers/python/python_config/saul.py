#!/usr/bin/env python3

### IMPORTS ###
import logging
import traceback
import requests

from os import environ
from flask import Flask, jsonify, request, redirect

### GLOBALS ###
app = Flask(__name__)

@app.route('/saul-api/config', methods=['GET'])
def config():
    response = {}
    if 'BASE_DECK_URL' in environ:
        response['BASE_DECK_URL'] = environ['BASE_DECK_URL'] if environ['BASE_DECK_URL'] != '' else "https://spinnaker.example.com"
    else:
        response['BASE_DECK_URL'] = "https://spinnaker.example.com"
    if 'BASE_GATE_URL' in environ:
        response['BASE_GATE_URL'] = environ['BASE_GATE_URL'] if environ['BASE_GATE_URL'] != '' else "https://spinnaker.example.com/api/v1"
    else:
        response['BASE_DECK_URL'] = "https://spinnaker.example.com/api/v1"
    if 'VERSION' in environ:
        response['VERSION'] = environ['VERSION'] if environ['VERSION'] != '' else "local"
    else:
        response['VERSION'] = "local"
    if 'AUTHENTICATION_ENABLED' in environ:
        response['AUTHENTICATION_ENABLED'] = environ['AUTHENTICATION_ENABLED'] == 'true'
    else:
        response['AUTHENTICATION_ENABLED'] = True
    if 'RBAC_ROLE_ADMIN_VIEW' in environ:
        response['RBAC_ROLE_ADMIN_VIEW'] = environ['RBAC_ROLE_ADMIN_VIEW'] if environ['RBAC_ROLE_ADMIN_VIEW'] != '' else False
    else:
        response['RBAC_ROLE_ADMIN_VIEW'] = False
    if 'DEBUG_MODE' in environ:
        response['DEBUG_MODE'] = environ['DEBUG_MODE'] == 'true'
    return jsonify(response)

@app.route('/saul-api/releases/images', methods=['GET'])
def images():
    data = requests.get('https://hub.docker.com/v2/repositories/marqaaron/spinnaker-saul/tags/')
    response = {}
    response['saul_data'] = data.json()
    return jsonify(response)

@app.route('/saul-api/releases/versions', methods=['GET'])
def versions():
    data = requests.get('https://api.github.com/repos/marqaaron/spinnaker-advanced-user-lab/releases')
    response = {}
    response['saul_data'] = data.json()
    return jsonify(response)

@app.route('/saul/', defaults={'path': ''})
@app.route('/saul/<path:path>')
def catch_all_saul(path):
    logging.info("Path: %s", path)
    if 'css/' in path:
        return app.send_static_file(path)
    elif 'js/' in path:
        return app.send_static_file(path)
    elif 'img/' in path:
        return app.send_static_file(path)
    elif 'env.js' in path:
        return app.send_static_file(path)
    elif 'favicon' in path:
        return app.send_static_file(path)
    else:
        return app.send_static_file("index.html")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    logging.info("Path: %s", path)
    return redirect('/saul/')

### CLASSES ###

### MAIN ###
def main():

    # Setup logging
    log_format = "%(asctime)s:%(levelname)s:%(name)s.%(funcName)s: %(message)s"
    logging.basicConfig(
        format=log_format,
        level=logging.DEBUG
    )

    # Set debug_mode variable based on environment variable at deployment
    if 'SERVER_DEBUG_MODE' in environ:
        debug_mode = True if environ['SERVER_DEBUG_MODE'] == 'true' else False
    else:
        debug_mode = False

    # Do stuff
    # Figure out the Kube Proxy thing
    app.run(host='0.0.0.0', port=8082, debug=debug_mode)

if __name__ == "__main__":
    main()