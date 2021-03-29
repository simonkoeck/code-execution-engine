#!/bin/sh
cp $1 /tmp/interim.java
timeout -s SIGKILL 10 java /tmp/interim.java
rm /tmp/interim.java