#!/usr/bin/env python3

### IMPORTS ###
import logging
import traceback
import requests

from os import environ
from flask import Flask, jsonify, request, redirect

### GLOBALS ###
app = Flask(__name__)

@app.route('/saul-api/releases/images', methods=['GET'])
def images():
    data = requests.get('https://hub.docker.com/v2/repositories/marqaaron/spinnaker-saul/tags/')
    response = {}
    response['result'] = data.json()
    return jsonify(response)

@app.route('/saul-api/releases/versions', methods=['GET'])
def versions():
    data = requests.get('https://api.github.com/repos/marqaaron/spinnaker-advanced-user-lab/releases')
    response = {}
    response['result'] = data.json()
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

    # Do stuff
    # Figure out the Kube Proxy thing
    app.run(host='0.0.0.0', port=8082)

if __name__ == "__main__":
    main()