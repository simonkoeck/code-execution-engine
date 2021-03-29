@echo off
C:
cd %1 >nul 2>&1
copy code.code code.go >nul 2>&1
set /p args=<args.args
go run code.go %args% < stdin.stdin