#!/bin/bash

version="v20200325"

os=""
arch=""

if [ $(uname -s) = "Linux" ]; then
    os="linux"
fi
if [ $(uname -s) = "Darwin" ]; then
    os="darwin"
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

if [ "$os" = "" -o "$arch" = "" ]; then
    echo "This script does not support your OS/ARCH yet. Please submit issue or PR to https://github.com/txthinking/nami"
    exit
fi

curl -L -o /tmp/nami "https://github.com/txthinking/nami/releases/download/$version/nami_${os}_$arch"
chmod +x /tmp/nami
/tmp/nami install github.com/txthinking/nami

rc="$HOME/.bashrc"
if [ "$os" = "darwin" ]; then
    rc="$HOME/.bash_profile"
fi
echo 'if [ -d $HOME/.nami/bin ]; then' >>$rc
echo '    export PATH=$HOME/.nami/bin:$PATH' >>$rc
echo 'fi' >>$rc
