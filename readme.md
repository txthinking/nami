# Nami

A clean and tidy decentralized package manager.

❤️ A project by [txthinking.com](https://www.txthinking.com)

## Install

    bash <(curl https://bash.ooo/nami.sh)

> ⚠️ Windows user should run in [Git Bash](https://t.me/txthinking/64946/65299), [Video](https://www.youtube.com/watch?v=CioIqzSlXl8)

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
| brook-store | A brook user system | [Website](https://github.com/txthinkinginc/brook-store) |
| brook | A cross-platform network tool designed for developers. | [Website](https://github.com/txthinking/brook) |
| bun | Incredibly fast JavaScript runtime, bundler, transpiler and package manager – all in one. | [Website](https://github.com/oven-sh/bun) |
| caddy | Fast and extensible multi-platform HTTP/1-2-3 web server with automatic HTTPS | [Website](https://github.com/caddyserver/caddy) |
| cidr-merger | A simple command line tool to merge ip/ip cidr/ip range, supports IPv4/IPv6 | [Website](https://github.com/zhanhb/cidr-merger) |
| cloudflare | cloudflare cli | [Website](https://github.com/txthinking/cloudflare) |
| cloudupload | Upload files to multiple Cloud Storage in parallel. Automatically apply for ssl certificate with your domain. | [Website](https://github.com/txthinking/cloudupload) |
| cmake | CMake, the cross-platform, open-source build system. | [Website](https://cmake.org/) |
| cowsay | cowsay is reborn. Neo Cowsay has written in Go. | [Website](https://github.com/Code-Hex/Neo-cowsay) |
| curl | curl with http3 support | [Website](https://github.com/curl/curl) |
| d2 | D2 is a modern diagram scripting language that turns text to diagrams. | [Website](https://github.com/terrastruct/d2) |
| deno | A modern runtime for JavaScript and TypeScript. | [Website](https://github.com/denoland/deno) |
| denobundle | Bundle assets into the binary with deno compile | [Website](https://github.com/txthinking/denobundle) |
| etcd | Distributed reliable key-value store for the most critical data of a distributed system | [Website](https://github.com/etcd-io/etcd) |
| fd | A simple, fast and user-friendly alternative to 'find' | [Website](https://github.com/sharkdp/fd) |
| ffmpeg | A complete, cross-platform solution to record, convert and stream audio and video. | [Website](https://github.com/txthinking/nami/blob/master/package/ffmpeg.tengo) |
| fzf | A command-line fuzzy finder | [Website](https://github.com/junegunn/fzf) |
| go | An open-source programming language supported by Google | [Website](https://go.dev) |
| hancock | Manage multiple remote servers and execute commands remotely | [Website](https://github.com/txthinking/hancock) |
| hey | HTTP load generator, ApacheBench (ab) replacement | [Website](https://github.com/rakyll/hey) |
| httpserver | This is a very simple http static server, sometimes we need it for testing | [Website](https://github.com/txthinking/httpserver) |
| icnsify | Easily create .icns files (Mac Icons) | [Website](https://github.com/JackMordaunt/icns) |
| ipatool | Command-line tool that allows searching and downloading app packages (known as ipa files) from the iOS App Store | [Website](https://github.com/majd/ipatool) |
| joker | Joker can turn process into daemon. Zero-Configuration | [Website](https://github.com/txthinking/joker) |
| jq | Command-line JSON processor | [Website](https://github.com/jqlang/jq) |
| mad | Generate root CA and derivative certificate for any domains and any IPs | [Website](https://github.com/txthinking/mad) |
| markdown | markdown converter | [Website](https://github.com/txthinking/markdown) |
| marp | A CLI interface for Marp and Marpit based converters | [Website](https://github.com/marp-team/marp-cli) |
| minify | Go minifiers for web formats | [Website](https://github.com/tdewolff/minify) |
| nami | The easy way to download anything from anywhere | [Website](https://github.com/txthinking/nami) |
| nico | A HTTP3 web server for reverse proxy and single page application, automatically apply for ssl certificate, Zero-Configuration. | [Website](https://github.com/txthinking/nico) |
| ninja | a small build system with a focus on speed | [Website](https://github.com/ninja-build/ninja) |
| nsq | A realtime distributed messaging platform | [Website](https://github.com/nsqio/nsq) |
| node | Node.js is an open-source, cross-platform JavaScript runtime environment. | [Website](https://nodejs.org) |
| openwrt | OpenWrt version of brook | [Website](https://github.com/txthinking/brook) |
| protoc | Protocol Buffers - Google's data interchange format | [Website](https://github.com/protocolbuffers/protobuf) |
| protoc-gen-js | protoc-gen-js executable | [Website](https://github.com/protocolbuffers/protobuf-javascript) |
| rsrc | Tool for embedding .ico & manifest resources in Go programs for Windows. | [Website](https://github.com/akavel/rsrc) |
| shadowsocks | A Rust port of shadowsocks | [Website](https://github.com/shadowsocks/shadowsocks-rust) |
| sshexec | A command-line tool to execute remote command through ssh | [Website](https://github.com/txthinking/sshexec) |
| stuntman | NAT type detection | [Website](https://www.stunprotocol.org/) |
| tengo | A fast script language for Go | [Website](https://github.com/d5/tengo) |
| ipio | Proxy all traffic just one line command. | [Website](https://github.com/txthinking/ipio) |
| yt-dlp | Command-line program to download videos from YouTube.com and other video sites | [Website](https://github.com/ytdl-org/youtube-dl/) |
| z | a process manager | [Website](https://github.com/txthinking/z) |
| zig | Zig is a general-purpose programming language and toolchain for maintaining robust, optimal and reusable software. | [Website](https://ziglang.org/) |
| zigup | Download and manage zig compilers. | [Website](https://github.com/marler8997/zigup) |
| zoro | zoro can help you expose local server to external network. Support both TCP/UDP, of course support HTTP. Zero-Configuration | [Website](https://github.com/txthinking/zoro) |

# Directory

- `$HOME/.nami`: All files of nami
- `$HOME/.nami/bin`: When installing nami, this path is already added to your $PATH
- `$HOME/.nami/cache`: This directory will be emptied before installing package
    - If the package can be standalone executable files:
        - The script should save only executable files to here. Such as [shadowsocks.tengo](https://github.com/txthinking/nami/blob/master/package/shadowsocks.tengo)
        > After the installation process is finished, nami will copy these files to the `$HOME/.nami/bin` directory
    - If the package is a directory:
        - The script should save the directory into here. Such as [go.tengo](https://github.com/txthinking/nami/blob/master/package/go.tengo)
        - And write the relative paths of executable files to `links` file, one path per line. Such as [go.tengo](https://github.com/txthinking/nami/blob/master/package/go.tengo)
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
- `cp(url string, dst string) => bytes/error`: download file to dst
- `cp(url string, { from: dst, from1: dst1 }) => bytes/error`: download compressed file, and copy one or more files
- `cp_dir(url string, { from: dst, from1: dst1 }, [link, link1]) => bytes/error`: download compressed file, and copy one or more directories, and create symbolic links

</details>

### Run local script

```
nami install ./exmaple.tengo
```

### PR

Fork nami project, put `exmaple.tengo` to package directory, create PR, then you can

```
nami install example
```

### Run remote script

```
nami install https://yourserver.com/exmaple.tengo
```

## License

Licensed under The GPLv3 License
