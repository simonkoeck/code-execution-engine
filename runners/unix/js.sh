#!/bin/sh
cd $1
timeout -s SIGKILL 10 xargs -a args.args -d '\n' node code.code < stdin.stdin