@echo off
cd %1
copy code.code code.go
go run code.go