# Nami

The easy way to download anything from anywhere. All files are stored in `$HOME/.nami`.

❤️ A project by [txthinking.com](https://www.txthinking.com)

## Install

    bash <(curl https://bash.ooo/nami.sh)

> ⚠️ Windows user should run in [Git Bash](https://gitforwindows.org/), [Video](https://www.youtube.com/watch?v=CioIqzSlXl8)

## Example

```
nami install brook
nami list
nami remove brook
```

You can also upgrade nami by nami

```
nami install nami
```

With HTTPS_PROXY environment

```
export HTTPS_PROXY=http://127.0.0.1:8010
nami install brook
```

Keep PATH with sudo

```
sudo visudo
```

```
Defaults        !env_reset
# Defaults       secure_path=...
```

## All officially maintained packages

| Package | Description | Website |
| --- | --- | --- |
| 7z | 7-Zip is a file archiver with a high compression ratio. | [Website](https://7-zip.org/) |
| agg | asciinema gif generator | [Website](https://github.com/asciinema/agg) |
| brook-manager | A Web UI for fully automatic management of Brook. 一个全自动管理 Brook 的 Web UI | [Website](https://github.com/txthinking/brook-manager) |
| brook | A cross-platform network tool designed for developers. 一个为开发者设计的跨平台网络工具. | [Website](https://github.com/txthinking/brook) |
| brookscript | Brook One-click script. 一键安装脚本 | [Website](https://github.com/txthinking/bash/blob/master/brook.js) |
| bun | Incredibly fast JavaScript runtime, bundler, transpiler and package manager – all in one. | [Website](https://github.com/oven-sh/bun) |
| caddy | Fast and extensible multi-platform HTTP/1-2-3 web server with automatic HTTPS | [Website](https://github.com/caddyserver/caddy) |
| cidr-merger | A simple command line tool to merge ip/ip cidr/ip range, supports IPv4/IPv6 | [Website](https://github.com/zhanhb/cidr-merger) |
| cloudflare | cloudflare cli | [Website](https://github.com/txthinking/cloudflare) |
| cloudupload | Upload files to multiple Cloud Storage in parallel. Automatically apply for ssl certificate with your domain. | [Website](https://github.com/txthinking/cloudupload) |
| cowsay | cowsay is reborn. Neo Cowsay has written in Go. | [Website](https://github.com/Code-Hex/Neo-cowsay) |
| d2 | D2 is a modern diagram scripting language that turns text to diagrams. | [Website](https://github.com/terrastruct/d2) |
| deno | A modern runtime for JavaScript and TypeScript. | [Website](https://github.com/denoland/deno) |
| denobundle | Bundle assets into the binary with deno compile | [Website](https://github.com/txthinking/denobundle) |
| fd | A simple, fast and user-friendly alternative to 'find' | [Website](https://github.com/sharkdp/fd) |
| ffmpeg | A complete, cross-platform solution to record, convert and stream audio and video. | [Website](https://github.com/txthinking/nami/blob/master/package/ffmpeg.tengo) |
| filelink | Upload and download file in command line | [Website](https://github.com/txthinking/filelink) |
| fzf | A command-line fuzzy finder | [Website](https://github.com/junegunn/fzf) |
| hancock | Manage multiple remote servers and execute commands remotely. 管理多个远程服务器并远程执行命令 | [Website](https://github.com/txthinking/hancock) |
| hey | HTTP load generator, ApacheBench (ab) replacement | [Website](https://github.com/rakyll/hey) |
| httpserver | This is a very simple http static server, sometimes we need it for testing | [Website](https://github.com/txthinking/httpserver) |
| icnsify | Easily create .icns files (Mac Icons) | [Website](https://github.com/JackMordaunt/icns) |
| ipatool | Command-line tool that allows searching and downloading app packages (known as ipa files) from the iOS App Store | [Website](https://github.com/majd/ipatool) |
| ix | command line pastebin. | [Website](http://ix.io/) |
| jinbe | Jinbe can add auto start command at boot. Zero-Configuration. Jinbe 可以添加开机自动启动命令. 无需配置. | [Website](https://github.com/txthinking/jinbe) |
| joker | Joker can turn process into daemon. Zero-Configuration. Joker 可以将进程变成守护进程. 无需配置. | [Website](https://github.com/txthinking/joker) |
| jb |  jb = javascript + bash | [Website](https://github.com/txthinking/jb) |
| jq | Command-line JSON processor | [Website](https://github.com/jqlang/jq) |
| mad | Generate root CA and derivative certificate for any domains and any IPs. 为任何域名和 IP 生成证书 | [Website](https://github.com/txthinking/mad) |
| markdown | markdown converter | [Website](https://github.com/txthinking/markdown) |
| marp | A CLI interface for Marp and Marpit based converters | [Website](https://github.com/marp-team/marp-cli) |
| minify | Go minifiers for web formats | [Website](https://github.com/tdewolff/minify) |
| nami | The easy way to download anything from anywhere. 从任何地方下载任何东西 | [Website](https://github.com/txthinking/nami) |
| nico | A HTTP3 web server for reverse proxy and single page application, automatically apply for ssl certificate, Zero-Configuration. | [Website](https://github.com/txthinking/nico) |
| protoc | Protocol Buffers - Google's data interchange format | [Website](https://github.com/protocolbuffers/protobuf) |
| rsrc | Tool for embedding .ico & manifest resources in Go programs for Windows. | [Website](https://github.com/akavel/rsrc) |
| shadowsocks | A Rust port of shadowsocks | [Website](https://github.com/shadowsocks/shadowsocks-rust) |
| sitemap | Build sitemap.xml | [Website](https://github.com/txthinking/sitemap) |
| sshexec | A command-line tool to execute remote command through ssh | [Website](https://github.com/txthinking/sshexec) |
| stuntman | NAT type detection. NAT 类型检测 | [Website](https://www.stunprotocol.org/) |
| tengo | A fast script language for Go | [Website](https://github.com/d5/tengo) |
| tun2brook | Proxy all traffic just one line command. tun2socks, tun2brook. IPv4 and IPv6, TCP and UDP. 只需一行命令. 让系统所有流量全部走 socks5, brook server, brook wsserver, brook wssserver. | [Website](https://github.com/txthinking/tun2brook) |
| yt-dlp | Command-line program to download videos from YouTube.com and other video sites | [Website](https://github.com/ytdl-org/youtube-dl/) |
| zigup | Download and manage zig compilers. | [Website](https://github.com/marler8997/zigup) |
| zoro | zoro can help you expose local server to external network. Support both TCP/UDP, of course support HTTP. Zero-Configuration. zoro 帮助你将本地端口暴露在外网.支持 TCP/UDP, 当然也支持 HTTP. 内网穿透. | [Website](https://github.com/txthinking/zoro) |

# How to create a package

### Step 1

Create `exmaple.js`, write [jb](https://github.com/txthinking/jb) script to save commands into `nami.cache_dir`

### Step 2

Test `exmaple.js`, `nami install ./exmaple.js`

### Step 3

Fork nami project, put `exmaple.js` to package directory, create PR, then you can `nami install example`

OR

Put `exmaple.js` to your own http server, then you can `nami install https://yourserver.com/exmaple.js`

Checkout example [httpserver.js](https://github.com/txthinking/nami/blob/master/package/httpserver.js) and [shadowsocks.js](https://github.com/txthinking/nami/blob/master/package/shadowsocks.js)

# The `nami` variable has built-in jb.

Most commonly used

-   `nami.os`: linux/darwin/windows/...
-   `nami.arch`: amd64/arm64/...
-   `nami.cache_dir`: you just need to put the command file here. A special text file name `version` is used to save the version number

Infrequently used

-   `nami.home_dir`: user home dir
-   `nami.bin_dir`: nami bin dir
-   `nami.copied_dir`: This is usually used if the command to be installed is running, 1: first get the process command, 2: then stop the process, 3: then copy the command from cache_dir to bin_dir, 4: then copy the command from cache_dir to copied_dir, 5: run the previously stopped process again
-   `nami.tmp_dir`: tmp dir, you can do some prepare working

## License

Licensed under The GPLv3 License
