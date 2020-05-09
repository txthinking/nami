# Nami

A decentralized binary package manager

### Install

    $ curl https://raw.githubusercontent.com/txthinking/nami/master/install.sh | bash && exec -l bash

> Windows user should run in [Git Bash](https://gitforwindows.org/)

### Usage

    NAME:
       nami - A decentralized binary package manager

    USAGE:
       nami [global options] command [command options] [arguments...]

    COMMANDS:
       install  Install package. $ nami install github.com/txthinking/nami
       upgrade  Upgrade package. $ nami upgrade github.com/txthinking/nami
       remove   Remove package. $ nami remove github.com/txthinking/brook
       info     Print package information. $ nami info github.com/txthinking/nami
       list     Print installed packages. $ nami list
       help, h  Shows a list of commands or help for one command

    GLOBAL OPTIONS:
       --help, -h  show help (default: false)

### Example

    $ nami install github.com/txthinking/nami

### What Does Nami Do?

All files are stored in `~/.nami`

## Nami for Software Publisher

-   Package name such as `any.domain.com/any/path`
-   Nami will send GET request to `https://` `any.domain.com/any/path` `/nami.json`, `nami.json` such as:
    ```
    {
        "version": "xxx",
        "files": [
            "https://any.domain.com/any/path/BINARYNAME_OS_ARCH"
        ]
    }
    ```

### Built-in supported domains

* `github.com`: Package name such as `github.com/txthinking/nami`, put binary files in the [github releases](https://github.com/txthinking/nami/releases)

### Binary file name format and OS & ARCH

`BINARYNAME_OS_ARCH`

> For Windows file, append .exe to file name

| OS        | ARCH     |
| --------- | -------- |
| darwin    | 386      |
| darwin    | amd64    |
| freebsd   | 386      |
| freebsd   | amd64    |
| linux     | 386      |
| linux     | amd64    |
| linux     | arm64    |
| netbsd    | 386      |
| netbsd    | amd64    |
| openbsd   | 386      |
| openbsd   | amd64    |
| openbsd   | arm64    |
| windows   | 386      |
| windows   | amd64    |

### Why

There are already many package managers, more are centralized and often provide outdated softwares.
Nami is a decentralized binary package manager,
she allows software authors to publish their software anywhere.
No longer have to worry about users downloading outdated software.

## License

Licensed under The GPLv3 License
