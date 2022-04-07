import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';
import {echo, s2b, home} from 'https://raw.githubusercontent.com/txthinking/denolib/master/f.js';

var n = nami("dotfiles.txthinking");
n.open_sourced_on("https://github.com/txthinking/nami");

await Deno.writeFile(home(".gitconfig"), s2b(`
[user]
	name = txthinking
	email = cloud@txthinking.com
[core]
	editor = vim
	pager = less -r
[color]
	ui = true
[merge]
	tool = vimdiff
[github]
	user = cloud@txthinking.com
[http]
    postBuffer = 104857600
[https]
    postBuffer = 104857600
`));

