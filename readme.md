# Nami

[中文](readme_zh.md)

[![Donate](https://img.shields.io/badge/Support-Donate-ff69b4.svg)](https://github.com/sponsors/txthinking)
[![Slack](https://img.shields.io/badge/Join-Telegram-ff69b4.svg)](https://docs.google.com/forms/d/e/1FAIpQLSdzMwPtDue3QoezXSKfhW88BXp57wkbDXnLaqokJqLeSWP9vQ/viewform)

<p align="center">
    <img style="float:right;" src="nami.png" alt="Nami" width="200" height="200"/>
</p>

A decentralized binary package manager. Nami only uses deno scripts to download commands, neither compiling nor downloading additional build chain tools, and you can specify the place of the script through `nami config`. All files are stored in `$HOME/.nami`.

❤️ A project by [txthinking.com](https://www.txthinking.com)

### Install

    curl -L https://raw.githubusercontent.com/txthinking/nami/master/install.sh | bash && sleep 3 && exec -l $SHELL

> Windows user should run in [Git Bash](https://gitforwindows.org/)

### Example

```
nami install nami
```

### Usage

```
NAME:
   nami - A decentralized binary package manager

USAGE:
   nami [global options] command [command options] [arguments...]

COMMANDS:
   install  Install package. $ nami install nami
   upgrade  Upgrade package. $ nami upgrade nami
   remove   Remove package. $ nami remove brook
   list     Print installed packages. $ nami list
   config   Configure key and value. $ nami config <key> <value>. See all keys, $ nami config
   release  Create or update a version with binaries directory on your github project, such as $ nami release github.com/txthinking/nami v1.1.1 ./binaries/
   help, h  Shows a list of commands or help for one command
```

### With HTTPS_PROXY environment

```
$ export HTTPS_PROXY=http://127.0.0.1:8888
$ nami install nami
```

### Keep PATH with sudo

```
$ sudo visudo
```

```
Defaults        !env_reset
# Defaults       secure_path=...
```

## Nami for Software Publisher

[wiki](https://github.com/txthinking/nami/wiki)

## Why

There are already many package managers, more are centralized and often provide outdated softwares.
Nami is a decentralized binary package manager,
she allows software authors to publish their software anywhere.
No longer have to worry about users downloading outdated software.
**Only install packages you trust**.

## License

Licensed under The GPLv3 License
