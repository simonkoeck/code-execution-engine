#!/bin/sh
cd $1
timeoutInSec=`cat timeout.timeout`
cp code.code interim.java
timeout -s SIGKILL $timeoutInSec xargs -a args.args -d '\n' java interim.java < stdin.stdin