#!/bin/bash
GOOS=darwin GOARCH=386 go build -o nami_darwin_386
GOOS=darwin GOARCH=amd64 go build -o nami_darwin_amd64
GOOS=freebsd GOARCH=386 go build -o nami_freebsd_386
GOOS=freebsd GOARCH=amd64 go build -o nami_freebsd_amd64
GOOS=linux GOARCH=386 go build -o nami_linux_386
GOOS=linux GOARCH=amd64 go build -o nami_linux_amd64
GOOS=linux GOARCH=arm64 go build -o nami_linux_arm64
GOOS=netbsd GOARCH=386 go build -o nami_netbsd_386
GOOS=netbsd GOARCH=amd64 go build -o nami_netbsd_amd64
GOOS=openbsd GOARCH=386 go build -o nami_openbsd_386
GOOS=openbsd GOARCH=amd64 go build -o nami_openbsd_amd64
GOOS=openbsd GOARCH=arm64 go build -o nami_openbsd_arm64

rm nami.tgz
tar czf nami.tgz nami_*
rm -rf nami_*
