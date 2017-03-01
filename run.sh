#!/bin/bash

set -e

docker build -t karteoffelstampf-local .
docker run -i -t -p 9999:9999 karteoffelstampf-local