import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';
import {sh, s2b, home} from 'https://raw.githubusercontent.com/txthinking/denolib/master/f.js';

var n = nami("dotfiles.txthinking");
n.open_sourced_on("https://github.com/txthinking/nami");

await Deno.writeFile(home(".vimrc"), s2b(`
set nocompatible            " no vi
filetype off                " for Vundle

let g:mapleader = ","

set rtp+=~/.vim/bundle/Vundle.vim
set rtp+=~/.fzf
call vundle#begin()

Plugin 'gmarik/vundle'

" l9 is a Vim-script library, which provides some utility functions and commands for programming in Vim.
Plugin 'vim-scripts/L9'

Plugin 'vim-scripts/The-NERD-tree'
let NERDTreeShowHidden=1
let NERDTreeChDirMode=2
let NERDTreeWinSize=24
map <leader>t :NERDTreeToggle<CR>

Plugin 'junegunn/fzf.vim'
map <leader>f :Files<CR>
map ; :Buffers<CR>

Plugin 'mileszs/ack.vim'
let g:ackprg = 'ag --nogroup --nocolor --column'

Plugin 'tpope/vim-commentary'

" Powerline is a statusline plugin for vim, and provides statuslines and prompts for several other applications, including zsh, bash, tmux, IPython, Awesome and Qtile.
Plugin 'Lokaltog/vim-powerline'
let g:Powerline_symbols = 'unicode'

" extended % matching for HTML, LaTeX, and many other languages
Plugin 'vim-scripts/matchit.zip'

Plugin 'ntpeters/vim-better-whitespace'
autocmd BufEnter * EnableStripWhitespaceOnSave

Plugin 'ajh17/VimCompletesMe'

Plugin 'vim-scripts/Align'
Plugin 'vim-scripts/DrawIt'
Plugin 'vim-scripts/matrix.vim--Yang'
Plugin 'vim-scripts/TeTrIs.vim'

" C/C++ IDE -- Write and run programs. Insert statements, idioms, comments etc.
Plugin 'vim-scripts/c.vim'

Plugin 'fatih/vim-go'
let g:go_play_open_browser = 0
let g:go_fmt_fail_silently = 1
let g:go_fmt_command = "goimports"
let g:go_fmt_autosave = 1
let g:go_highlight_functions = 1
let g:go_highlight_methods = 1
let g:go_highlight_structs = 1
let g:go_highlight_operators = 1
let g:go_highlight_build_constraints = 1
let g:go_def_mode = 'gopls'
let g:go_info_mode = 'gopls'
map <leader>gd :GoDef<CR>
map <leader>gm :GoMetaLinter<CR>
map <leader>gp :GoPlay<CR>

Plugin 'dart-lang/dart-vim-plugin'
let dart_format_on_save = 1

Plugin 'plasticboy/vim-markdown'
let g:vim_markdown_folding_disabled=1

Plugin 'prettier/vim-prettier'
let g:prettier#autoformat = 1
let g:prettier#autoformat_require_pragma = 0
let g:prettier#config#print_width = 10000

call vundle#end()

set history=700             " Sets how many lines of history VIM has to remember
set autoread                " Set to auto read when a file is changed from the outside
set showtabline=0           " hide tab
set so=7                    " Set 7 lines to the cursor - when moving vertically using j/k
set wildmenu                " Turn on the WiLd menu
set wildignore=*.o,*~,*.pyc " Ignore compiled files
set ruler                   " Always show current position
set cmdheight=1             " Height of the command bar
set hid                     " A buffer becomes hidden when it is abandoned
set backspace=eol,start,indent  " Configure backspace so it acts as it should act
set whichwrap+=<,>,h,l
set smartcase               " When searching try to be smart about cases
set hlsearch                " Highlight search results
set incsearch               " Makes search act like search in modern browsers
set lazyredraw              " Don't redraw while executing macros (good performance config)
set magic                   " For regular expressions turn magic on
set showmatch               " Show matching brackets when text indicator is over them
set mat=2                   " How many tenths of a second to blink when matching brackets
set noerrorbells            " No annoying sound on errors
set novisualbell            " No annoying sound on errors
set t_vb=                   " No annoying sound on errors
set tm=500
set noscrollbind            " sync scroll
set background=dark
set encoding=utf8           " Set utf8 as standard encoding and en_US as the standard language
set ffs=unix,dos,mac        " Use Unix as the standard file type
set fileformat=unix         " unix
set nobackup                " no backup
set nowb                    " no backup
set noswapfile              " no backup
set expandtab               " Use spaces instead of tabs
set smarttab                " Be smart when using tabs ;)
set shiftwidth=4            " 1 tab == 4 spaces
set tabstop=4
set softtabstop=4
set lbr                     " Linebreak on 500 characters
set tw=500
set ai                      " Auto indent
set si                      " Smart indent
set wrap                    " Wrap lines
set autoindent
set smartindent
set nu                      " show line number
set confirm                 " confirm when do not save
set formatoptions=tcrqn
set cindent
set completeopt=longest,menu " C-X,C-O & C-P C-N hide preview window
set tags=~/.tags            " tags file
set laststatus=2            " Always show the status line
set viminfo^=%              " Remember info about open buffers on close

colorscheme desert
syntax enable

nmap <leader>w :w!<cr>

map <C-j> <C-W>j
map <C-k> <C-W>k
map <C-h> <C-W>h
map <C-l> <C-W>l

map <leader>tn :tabnew<cr>
map <leader>to :tabonly<cr>
map <leader>tc :tabclose<cr>
map <leader>tm :tabmove
map <leader>te :tabedit <c-r>=expand("%:p:h")<cr>/

map <leader>ss :setlocal spell!<cr>
map <leader>sn ]s
map <leader>sp [s
map <leader>sa zg
map <leader>s? z=

" quickfix error
map <leader>n :cn<cr>
map <leader>p :cp<cr>

" others
map <leader>pp :setlocal paste!<cr>
map <silent> <leader><cr> :noh<cr>

if exists('$TMUX')
    let &t_SI = "\\<Esc>Ptmux;\\<Esc>\\<Esc>]50;CursorShape=1\\x7\\<Esc>\\\\"
    let &t_EI = "\\<Esc>Ptmux;\\<Esc>\\<Esc>]50;CursorShape=0\\x7\\<Esc>\\\\"
else
    let &t_SI = "\\<Esc>]50;CursorShape=1\\x7"
    let &t_EI = "\\<Esc>]50;CursorShape=0\\x7"
endif

filetype plugin indent on       " for vundle
`));

// if(Deno.build.os == "linux"){
//   await sh(`sudo apt-get -y install make gcc g++ cmake vim-nox git build-essential python3-dev silversearcher-ag`);
// }
// await sh(`rm -rf ${home(".vim")}`);
// await sh(`mkdir ${home(".vim")}`);
// await sh(`git clone https://github.com/gmarik/Vundle.vim.git ${home(".vim", "bundle", "Vundle.vim")}`);
// await sh(`rm -rf ${home(".fzf")}`);
// await sh(`git clone --depth 1 https://github.com/junegunn/fzf.git ${home(".fzf")}`);
// echo(`TODO:\nvim +PluginInstall +qall && vim +GoInstallBinaries +qall`);
