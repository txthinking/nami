#!/usr/bin/env bash

version="v20201101"

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
if [ $(uname -s | grep "MINGW" | wc -l) -eq 1 ]; then
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

t=$(date +%s)

curl -L -o /tmp/nami${t}$sfx "https://github.com/txthinking/nami/releases/download/$version/nami_${os}_${arch}$sfx"
chmod +x /tmp/nami${t}$sfx
/tmp/nami${t}$sfx install github.com/txthinking/nami

echo 'if [ -d $HOME/.nami/bin ]; then' >>$HOME/.bashrc
echo '    export PATH=$HOME/.nami/bin:$PATH' >>$HOME/.bashrc
echo 'fi' >>$HOME/.bashrc

echo 'if [ -d $HOME/.nami/bin ]; then' >>$HOME/.bash_profile
echo '    export PATH=$HOME/.nami/bin:$PATH' >>$HOME/.bash_profile
echo 'fi' >>$HOME/.bash_profile

echo source ~/.bashrc >>$HOME/.zshenv
echo source ~/.bash_profile >>$HOME/.zshenv
