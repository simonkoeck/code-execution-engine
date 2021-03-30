#!/bin/sh
cd $1
timeoutInSec=`cat timeout.timeout`
cp code.code code.c
timeout -s SIGKILL 5 gcc code.c -o a.out
chmod +x a.out
timeout -s SIGKILL $timeoutInSec xargs -a args.args -d '\n' ./a.out < stdin.stdin