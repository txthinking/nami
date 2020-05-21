#!/usr/bin/env bash

version="v20200516"

os=""
arch=""

if [ $(uname -s) = "Darwin" ]; then
	os="darwin"
fi
if [ $(uname -s) = "FreeBSD" ]; then
	os="freebsd"
fi
if [ $(uname -s) = "Linux" ]; then
	os="linux"
fi
if [ $(uname -s) = "NetBSD" ]; then
	os="netbsd"
fi
if [ $(uname -s) = "OpenBSD" ]; then
	os="openbsd"
fi
if [ $(uname -s | grep -P "MINGW" | wc -l) -eq 1 ]; then
	os="windows"
fi

if [ $(uname -m) = "x86_64" ]; then
	arch="amd64"
fi
if [ $(uname -m) = "i386" ]; then
	arch="386"
fi
if [ $(uname -m) = "i686" ]; then
	arch="386"
fi
if [ $(uname -m) = "arm64" ]; then
	arch="arm64"
fi
if [ $(uname -m) = "aarch64" ]; then
	arch="arm64"
fi

if [ "$os" = "" -o "$arch" = "" ]; then
	echo "This script does not support your OS/ARCH yet. Please submit issue or PR to https://github.com/txthinking/nami"
	exit
fi

sfx=""
if [ $os = "windows" ]; then
	sfx=".exe"
fi

curl -L -o /tmp/nami0$sfx "https://github.com/txthinking/nami/releases/download/$version/nami_${os}_${arch}$sfx"
chmod +x /tmp/nami0$sfx
/tmp/nami0$sfx install github.com/txthinking/nami

rc="$HOME/.bashrc"
if [ "$os" = "darwin" ]; then
	rc="$HOME/.bash_profile"
fi
echo 'if [ -d $HOME/.nami/bin ]; then' >>$rc
echo '    export PATH=$HOME/.nami/bin:$PATH' >>$rc
echo 'fi' >>$rc

if [ "$os" = "darwin" ]; then
	echo source ~/.bash_profile >>$HOME/.zshenv
fi
if [ "$os" != "darwin" ]; then
	echo source ~/.bashrc >>$HOME/.zshenv
fi
