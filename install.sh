#!/usr/bin/env bash

os=""
arch=""

if [ $(uname -s) = "Darwin" ]; then
    os="darwin"
fi
if [ $(uname -s) = "Linux" ]; then
    os="linux"
fi
if [ $(uname -s | grep "MINGW" | wc -l) -eq 1 ]; then
    os="windows"
fi

if [ $(uname -m) = "x86_64" ]; then
    arch="amd64"
fi
if [ $(uname -m) = "arm64" ]; then
    arch="arm64"
fi
if [ $(uname -m) = "aarch64" ]; then
    arch="arm64"
fi

if [ "$os" = "" -o "$arch" = "" ]; then
    echo "Nami does not support your OS/ARCH yet. Please submit issue or PR to https://github.com/txthinking/nami"
    exit
fi

sfx=""
if [ $os = "windows" ]; then
    sfx=".exe"
fi

curl -L -o /tmp/nami$sfx "https://github.com/txthinking/nami/releases/latest/download/nami_${os}_${arch}$sfx"
chmod +x /tmp/nami$sfx
/tmp/nami$sfx install nami

echo 'if [ -d $HOME/.nami/bin ]; then' >>$HOME/.bashrc
echo '    export PATH=$HOME/.nami/bin:$PATH' >>$HOME/.bashrc
echo 'fi' >>$HOME/.bashrc

echo 'if [ -d $HOME/.nami/bin ]; then' >>$HOME/.bash_profile
echo '    export PATH=$HOME/.nami/bin:$PATH' >>$HOME/.bash_profile
echo 'fi' >>$HOME/.bash_profile

echo source ~/.bashrc >>$HOME/.zshenv
echo source ~/.bash_profile >>$HOME/.zshenv
