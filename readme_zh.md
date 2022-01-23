# Nami

[English](readme.md)

[🗣 Talks](https://t.me/txthinking_talks)
[💬 Join](https://join.txthinking.com)
[🩸 Youtube](https://www.youtube.com/txthinking) 
[❤️ Sponsor](https://github.com/sponsors/txthinking)

简单的从任何地方下载命令. Nami只借助deno脚本下载命令, 不编译也不下载额外的编译链工具. 所有的文件都存储在 `$HOME/.nami` 目录下.

❤️ A project by [txthinking.com](https://www.txthinking.com)

### 安装

    bash <(curl https://bash.ooo/nami.sh)

> Windows 用户应该使用 [Git Bash](https://gitforwindows.org/) 运行命令

### 举例

```
nami install nami
```

```
nami install joker brook ipio nico jinbe testsocks5 testbrook
```

### 使用

```
NAME:
   nami - A decentralized binary package manager

USAGE:
   nami [global options] command [command options] [arguments...]

COMMANDS:
   install  Install package. $ nami install nami
   upgrade  Upgrade package. $ nami upgrade nami. Or upgrade all installed packages $ nami upgrade
   remove   Remove package. $ nami remove brook
   list     Print installed packages. $ nami list
   config   Configure key and value. $ nami config <key> <value>. See all keys, $ nami config
   release  Create or update a version with binaries directory on your github project, such as $ nami release github.com/txthinking/nami v1.1.1 ./binaries/
   help, h  Shows a list of commands or help for one command
```

### 支持 HTTPS_PROXY 环境变量

```
$ export HTTPS_PROXY=http://127.0.0.1:8888
$ nami install nami
```

### 保持 sudo PATH

```
$ sudo visudo
```

```
Defaults        !env_reset
# Defaults       secure_path=...
```

### 如何添加包

[package/readme.md](package/readme.md)


## 开源协议

基于 GPLv3 协议开源
