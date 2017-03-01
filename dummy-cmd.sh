#!/bin/bash

echo "my output"
sleep 1s
echo "my output number two"
sleep 1s
echo "weeeeeeee"
sleep 3s
echo "oops an error " 1>&2
sleep 1s
echo "something normal again "
sleep 1s
echo "oops an error " 1>&2
sleep 1s
echo "last one"
