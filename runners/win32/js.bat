@echo off
C:
cd %1 >nul 2>&1
set /p args=<args.args
node code.code %args% < stdin.stdin