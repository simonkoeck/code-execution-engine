#!/bin/sh
cd $1
cp code.code code.c
timeout -s SIGKILL 10 gcc code.c -o a.out
chmod +x a.out
timeout -s SIGKILL 10 xargs -a args.args -d '\n' ./a.out < stdin.stdin