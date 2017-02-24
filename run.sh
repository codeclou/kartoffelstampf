#!/bin/bash

# will cause exit of whole script if one command inside fails
set -e

# BUILD DOCKER AND RUN
docker build -t karteoffelstampf-local .
docker run -i -t -p 9999:9999 karteoffelstampf-local