#!/bin/sh
cd $1
timeoutInSec=`cat timeout.timeout`
timeout -s SIGKILL $timeoutInSec xargs -a args.args -d '\n' bash code.code < stdin.stdin