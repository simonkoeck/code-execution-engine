#!/bin/sh
cd $1
timeoutInSec=`cat timeout.timeout`
cp code.code code.go
timeout -s SIGKILL $timeoutInSec xargs -a args.args -d '\n' go run code.go < stdin.stdin