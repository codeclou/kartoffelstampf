#!/bin/bash

set -e

umask u+rxw,g+rwx,o-rwx

exec "$@"
