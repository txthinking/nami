# Nami

A clean and tidy decentralized package manager.

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

<details>
<summary>With HTTPS_PROXY environment</summary>

```
export HTTPS_PROXY=http://127.0.0.1:8010
nami install brook
```
</details>

<details>
<summary>Keep PATH with sudo</summary>

```
sudo visudo
```

```
Defaults        !env_reset
# Defaults       secure_path=...
```
</details>

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
| cmake | CMake, the cross-platform, open-source build system. | [Website](https://cmake.org/) |
| cowsay | cowsay is reborn. Neo Cowsay has written in Go. | [Website](https://github.com/Code-Hex/Neo-cowsay) |
| d2 | D2 is a modern diagram scripting language that turns text to diagrams. | [Website](https://github.com/terrastruct/d2) |
| deno | A modern runtime for JavaScript and TypeScript. | [Website](https://github.com/denoland/deno) |
| denobundle | Bundle assets into the binary with deno compile | [Website](https://github.com/txthinking/denobundle) |
| fd | A simple, fast and user-friendly alternative to 'find' | [Website](https://github.com/sharkdp/fd) |
| ffmpeg | A complete, cross-platform solution to record, convert and stream audio and video. | [Website](https://github.com/txthinking/nami/blob/master/package/ffmpeg.tengo) |
| fzf | A command-line fuzzy finder | [Website](https://github.com/junegunn/fzf) |
| go | An open-source programming language supported by Google | [Website](https://go.dev) |
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
| ninja | a small build system with a focus on speed | [Website](https://github.com/ninja-build/ninja) |
| node | Node.js is an open-source, cross-platform JavaScript runtime environment. | [Website](https://nodejs.org) |
| protoc | Protocol Buffers - Google's data interchange format | [Website](https://github.com/protocolbuffers/protobuf) |
| rsrc | Tool for embedding .ico & manifest resources in Go programs for Windows. | [Website](https://github.com/akavel/rsrc) |
| shadowsocks | A Rust port of shadowsocks | [Website](https://github.com/shadowsocks/shadowsocks-rust) |
| sshexec | A command-line tool to execute remote command through ssh | [Website](https://github.com/txthinking/sshexec) |
| stuntman | NAT type detection. NAT 类型检测 | [Website](https://www.stunprotocol.org/) |
| tengo | A fast script language for Go | [Website](https://github.com/d5/tengo) |
| tun2brook | Proxy all traffic just one line command. tun2socks, tun2brook. IPv4 and IPv6, TCP and UDP. 只需一行命令. 让系统所有流量全部走 socks5, brook server, brook wsserver, brook wssserver. | [Website](https://github.com/txthinking/tun2brook) |
| yt-dlp | Command-line program to download videos from YouTube.com and other video sites | [Website](https://github.com/ytdl-org/youtube-dl/) |
| zig | Zig is a general-purpose programming language and toolchain for maintaining robust, optimal and reusable software. | [Website](https://ziglang.org/) |
| zigup | Download and manage zig compilers. | [Website](https://github.com/marler8997/zigup) |
| zoro | zoro can help you expose local server to external network. Support both TCP/UDP, of course support HTTP. Zero-Configuration. zoro 帮助你将本地端口暴露在外网.支持 TCP/UDP, 当然也支持 HTTP. 内网穿透. | [Website](https://github.com/txthinking/zoro) |

# Directory

- `$HOME/.nami`: All files of nami
- `$HOME/.nami/bin`: When installing nami, this path is already added to your $PATH
- `$HOME/.nami/cache`: This directory will be emptied before installing package
    - If the package can be standalone executable files:
        - The script should save only executable files to here. Such as [shadowsocks.tengo](https://github.com/txthinking/nami/blob/master/package/shadowsocks.tengo) or [shadowsocks.js](https://github.com/txthinking/nami/blob/master/package/shadowsocks.js)
        > After the installation process is finished, nami will copy these files to the `$HOME/.nami/bin` directory
    - If the package is a directory:
        - The script should save the directory into here. Such as [go.tengo](https://github.com/txthinking/nami/blob/master/package/go.tengo) or [node.js](https://github.com/txthinking/nami/blob/master/package/node.js)
        - And write the relative paths of executable files to `links` file, one path per line. Such as [go.tengo](https://github.com/txthinking/nami/blob/master/package/go.tengo) or [node.js](https://github.com/txthinking/nami/blob/master/package/node.js)
        > After the installation process is finished, nami will copy the directory to the `$HOME/.nami/dir/` directory and will create symbolic links to the `$HOME/.nami/bin` based on `links`
    - Write version to `version` file
- `$HOME/.nami/copied`: This is usually used if the command to be installed is running, such as [brook.tengo](https://github.com/txthinking/nami/blob/master/package/brook.tengo), you may:
    1. get the processes
    2. stop the processes
    3. copy(not move) the commands from `$HOME/.nami/cache` to `$HOME/.nami/bin`
    4. copy the commands from `$HOME/.nami/cache` to `$HOME/.nami/copied`, this prompts nami not to perform duplicate operations
    5. run the previously stopped processes again

# Script

<details>
<summary>tengo</summary>

Nami supports [tengo](https://github.com/d5/tengo) script, there is a built-in module `import("nami")` for convenience:

- `nami.os`: linux/darwin/windows/...
- `nami.arch`: amd64/arm64/...
- `nami.home_dir`: $HOME
- `nami.bin_dir`: $HOME/.nami/bin
- `nami.cache_dir`: $HOME/.nami/cache
- `nami.copied_dir`: $HOME/.nami/copied
- `append_file(file string, text string) => error`
- `write_file(file string, text string) => error`
- `sh(name string, args...) => error`: run command
- `sh1(name string, args...) => bytes/error`: run command and return stdout

</details>

<details>
<summary>javascript</summary>

Nami supports [jb](https://github.com/txthinking/jb) script, there is a built-in global object `nami` for convenience:

- `nami.os`: linux/darwin/windows/...
- `nami.arch`: amd64/arm64/...
- `nami.home_dir`: $HOME
- `nami.bin_dir`: $HOME/.nami/bin
- `nami.cache_dir`: $HOME/.nami/cache
- `nami.copied_dir`: $HOME/.nami/copied

</details>

### Run local script

```
nami install ./exmaple.js
```

### PR

Fork nami project, put `exmaple.js` to package directory, create PR, then you can

```
nami install example`
```

### Run remote script

```
nami install https://yourserver.com/exmaple.js
```

## License

Licensed under The GPLv3 License
