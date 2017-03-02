#!/bin/bash

set -e

npm install

# START IN WATCHMODE
docker run \
    -i -t \
    -p 9999:9999 \
    -v $(pwd)/:/opt/npm/app/ \
    codeclou/kartoffelstampf:latest \
    npm run watch

#karteoffelstampf-local \