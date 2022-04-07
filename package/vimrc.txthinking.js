import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';
import {sh, s2b, home} from 'https://raw.githubusercontent.com/txthinking/denolib/master/f.js';

var n = nami("vimrc.txthinking");
n.open_sourced_on("https://github.com/txthinking/dotfiles");

var r = await n.fetch("https://raw.githubusercontent.com/txthinking/dotfiles/master/vim/.vimrc");
var t = await r.text();
await Deno.writeFile(home(".vimrc"), s2b(t));

if(Deno.build.os == "linux"){
  await sh(`sudo apt-get -y install make gcc g++ python-dev cmake vim-nox git build-essential python3-dev silversearcher-ag`);
}
await sh(`rm -rf ${home(".vim")}`);
await sh(`mkdir ${home(".vim")}`);
await sh(`git clone https://github.com/gmarik/Vundle.vim.git ${home(".vim", "bundle", "Vundle.vim")}`);
await sh(`rm -rf ${home(".fzf")}`);
await sh(`git clone --depth 1 https://github.com/junegunn/fzf.git ${home(".fzf")}`);
await sh(`vim +PluginInstall +qall`);
await sh(`vim +GoInstallBinaries +qall`);
