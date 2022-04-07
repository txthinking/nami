import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';
import {echo, s2b, home} from 'https://raw.githubusercontent.com/txthinking/denolib/master/f.js';

var n = nami("dotfiles.txthinking");
n.open_sourced_on("https://github.com/txthinking/nami");

await Deno.writeFile(home(".customize_environment"), s2b(`
#!/bin/sh
apt-get update
apt-get -y remove nano
apt-get -y install make gcc g++ cmake vim-nox git build-essential python3-dev silversearcher-ag
apt-get -y install ffmpeg
apt-get -y install fonts-arphic-ukai fonts-arphic-uming
apt-get -y install musl-tools
`));

