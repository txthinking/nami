#!/bin/bash

if [ $# -ne 1 ]; then
    echo "./build.sh version"
    exit
fi

mkdir _

CGO_ENABLED=0 GOOS=darwin GOARCH=arm64 go build  -trimpath -ldflags="-w -s" -o _/nami_darwin_arm64
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build  -trimpath -ldflags="-w -s" -o _/nami_darwin_amd64
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build   -trimpath -ldflags="-w -s" -o _/nami_linux_amd64
CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build   -trimpath -ldflags="-w -s" -o _/nami_linux_arm64
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -trimpath -ldflags="-w -s" -o _/nami_windows_amd64.exe

nami release github.com/txthinking/nami $1 _

rm -rf _
