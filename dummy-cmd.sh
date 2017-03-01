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
echo "now comes the progress bar"
sleep 1s
echo -ne '#####                     (33%)\r'
sleep 1
echo -ne '#############             (66%)\r'
sleep 1
echo -ne '#######################   (100%)\r'
echo -ne '\n'
echo "now comes the color"
echo -e "\n\n\033[1;33;40m 33;40  \033[1;33;41m 33;41  \033[1;33;42m 33;42  \033[1;33;43m 33;43  \033[1;33;44m 33;44  \033[1;33;45m 33;45  \033[1;33;46m 33;46  \033[1m\033[0\n\n\033[1;33;42m >> Tests OK\n\n"

