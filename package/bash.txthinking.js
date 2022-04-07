import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';
import {echo, s2b, home} from 'https://raw.githubusercontent.com/txthinking/denolib/master/f.js';

var n = nami("dotfiles.txthinking");
n.open_sourced_on("https://github.com/txthinking/nami");

if(Deno.build.os != "darwin"){
    // non-login shell
    await Deno.writeFile(home(".bashrc"), s2b(`\nPS1='FUCK \\W $ '\nset -o vi\n`), {append: true});
    // login shell
    await Deno.writeFile(home(".bash_profile"), s2b(`\ncase $- in *i*) . ~/.bashrc;; esac\n`), {append: true});
}

if(Deno.build.os == "darwin"){
    await Deno.writeFile(home(".bash_profile"), s2b(`
export LANG=en_US.UTF-8
set -o vi
if [ -d ~/flutter ]; then
    export PATH=~/flutter/bin:$PATH
fi
if [ -d ~/.pub-cache ]; then
    export PATH=~/.pub-cache/bin:$PATH
fi
if [ -d ~/go ]; then
    export GOPATH=~/go
    export PATH=$GOPATH/bin:$PATH
fi
`), {append: true});
}


echo(`TODO:\nexec -l $SHELL`);
