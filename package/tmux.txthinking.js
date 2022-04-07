import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';
import {echo, s2b, home} from 'https://raw.githubusercontent.com/txthinking/denolib/master/f.js';

var n = nami("dotfiles.txthinking");
n.open_sourced_on("https://github.com/txthinking/nami");

await Deno.writeFile(home(".tmux.conf"), s2b(`
unbind C-b
set -g prefix C-a
set -g history-limit 10000
bind C-a last-window

# split windows like vim
# vim's definition of a horizontal/vertical split is reversed from tmux's
bind s split-window -v
bind v split-window -h

# move around panes with hjkl, as one would in vim after pressing ctrl-w
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# resize panes like vim
# feel free to change the "1" to however many lines you want to resize by, only
# one at a time can be slow
bind < resize-pane -L 1
bind > resize-pane -R 1
bind - resize-pane -D 1
bind + resize-pane -U 1

# bind : to command-prompt like vim
# this is the default in tmux already
bind : command-prompt

# vi-style controls for copy mode
setw -g mode-keys vi
`));

