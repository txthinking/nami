# Nami

[English](readme.md)

[![捐赠](https://img.shields.io/badge/%E6%94%AF%E6%8C%81-%E6%8D%90%E8%B5%A0-ff69b4.svg)](https://github.com/sponsors/txthinking)
[![交流群](https://img.shields.io/badge/%E7%94%B3%E8%AF%B7%E5%8A%A0%E5%85%A5-%E4%BA%A4%E6%B5%81%E7%BE%A4-ff69b4.svg)](https://docs.google.com/forms/d/e/1FAIpQLSdzMwPtDue3QoezXSKfhW88BXp57wkbDXnLaqokJqLeSWP9vQ/viewform)

<p align="center">
    <img style="float:right;" src="nami.png" alt="Nami" width="200" height="200"/>
</p>

一个分布式二进制软件包管理器. Nami只借助deno脚本下载命令, 不编译也不下载额外的编译链工具, 并且你可以通过`nami config`来指定脚本的地方. 所有的文件都存储在 `$HOME/.nami` 目录下.

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

## 为什么

已经有很多软件包管理器, 但很多是中心化的或者提供过时的软件.
Nami是分布式的二进制软件包管理器, 她允许软件开发者将软件发布到任何地方.
不用担心用户下载到的过时的软件.
**只安装你信任的软件**.

## 开源协议

基于 GPLv3 协议开源
