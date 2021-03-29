#!/bin/sh
timeout -s SIGKILL 10 g++ $1 -o $1.out
chmod +x $1.out
timeout -s SIGKILL 10 $1.out
rm $1.out