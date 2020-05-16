#!/bin/bash

if [ $# -ne 1 ]; then
	echo "./build.sh version"
	exit
fi

mkdir _

GOOS=darwin GOARCH=386 go build -o _/nami_darwin_386
GOOS=darwin GOARCH=amd64 go build -o _/nami_darwin_amd64
GOOS=freebsd GOARCH=386 go build -o _/nami_freebsd_386
GOOS=freebsd GOARCH=amd64 go build -o _/nami_freebsd_amd64
GOOS=linux GOARCH=386 go build -o _/nami_linux_386
GOOS=linux GOARCH=amd64 go build -o _/nami_linux_amd64
GOOS=linux GOARCH=arm64 go build -o _/nami_linux_arm64
GOOS=netbsd GOARCH=386 go build -o _/nami_netbsd_386
GOOS=netbsd GOARCH=amd64 go build -o _/nami_netbsd_amd64
GOOS=openbsd GOARCH=386 go build -o _/nami_openbsd_386
GOOS=openbsd GOARCH=amd64 go build -o _/nami_openbsd_amd64
GOOS=openbsd GOARCH=arm64 go build -o _/nami_openbsd_arm64
GOOS=windows GOARCH=amd64 go build -o _/nami_windows_amd64.exe
GOOS=windows GOARCH=386 go build -o _/nami_windows_386.exe

nami release github.com/txthinking/nami $1 _

rm -rf _
