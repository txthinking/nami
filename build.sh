#!/bin/bash

if [ $# -ne 1 ]; then
    echo "./build.sh version"
    exit
fi

mkdir _

curl -L https://github.com/denoland/deno/releases/latest/download/deno-aarch64-apple-darwin.zip -o deno.zip
unzip deno.zip
mv deno static/
rm deno.zip
CGO_ENABLED=0 GOOS=darwin GOARCH=arm64 go build -ldflags="-w -s" -o _/nami_darwin_arm64
CGO_ENABLED=0 GOOS=darwin GOARCH=arm64 go build -ldflags="-w -s" -o _/nami_Darwinarm64

curl -L https://github.com/denoland/deno/releases/latest/download/deno-x86_64-apple-darwin.zip -o deno.zip
unzip deno.zip
mv deno static/
rm deno.zip
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -ldflags="-w -s" -o _/nami_darwin_amd64
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -ldflags="-w -s" -o _/nami_Darwinx86_64

curl -L https://github.com/denoland/deno/releases/latest/download/deno-x86_64-unknown-linux-gnu.zip -o deno.zip
unzip deno.zip
mv deno static/
rm deno.zip
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o _/nami_linux_amd64
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o _/nami_Linuxx86_64

curl -L https://github.com/denoland/deno/releases/latest/download/deno-x86_64-pc-windows-msvc.zip -o deno.zip
unzip deno.zip
mv deno.exe static/
rm deno.zip
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -ldflags="-w -s" -o _/nami_windows_amd64.exe
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -ldflags="-w -s" -o _/nami_MINGW64x86_64

nami release github.com/txthinking/nami $1 _

rm -rf _
