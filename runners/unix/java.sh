#!/bin/sh
cd $1
cp code.code interim.java
timeout -s SIGKILL 10 xargs -a args.args -d '\n' java interim.java < stdin.stdin