# Nami

A decentralized binary package manager

### Why

There are already many package managers, like apt-get, brew, but this is all centralized.
Every time the author updates the software, they need to write complex configuration files and PRs and wait for merge.

Nami is a decentralized binary package manager,
she allows software authors to publish their software anywhere,
without having to request a merge from a software center for each update.

### Install

    $ curl -sL git.io/getnami | bash && exec -l $SHELL

or download from [releases](https://github.com/txthinking/nami/releases)

### Usage

    NAME:
       nami - A decentralized binary package manager

    USAGE:
       nami [global options] command [command options] [arguments...]

    COMMANDS:
       install  Install package. $ nami install github.com/txthinking/nami
       upgrade  Upgrade package. $ nami upgrade github.com/txthinking/nami
       remove   Remove package. $ nami remove github.com/txthinking/nami
       info     Print package information. $ nami info github.com/txthinking/nami
       list     Print installed packages. $ nami list
       help, h  Shows a list of commands or help for one command

    GLOBAL OPTIONS:
       --help, -h  show help (default: false)

### Example

    $ nami install github.com/txthinking/nami

### What Does Nami Do?

All files are stored in `~/.nami`

# Nami for Software Publisher

-   Package name such as `yourdomain.com/package`
-   Nami will send GET request to `https://yourdomain.com/package/nami.json`, `nami.json` such as:
    ```
    {
        "version": "xxx",
        "files": [
            "https://anydomain.com/anypath/BINARYNAME1_OS_ARCH",
            "https://anydomain.com/anypath/BINARYNAME2_OS_ARCH",
            "https://anydomain.com/anypath/BINARYNAME1_OS_ARCH.exe", // append .exe for windows
            "https://anydomain.com/anypath/BINARYNAME2_OS_ARCH.exe"
        ]
    }
    ```

### Built-in supported domains

* `github.com`: Package name such as `github.com/txthinking/nami`, put your binary files in the [github releases](https://github.com/txthinking/nami/releases)

### OS & ARCH

| OS        | ARCH     |
| --------- | -------- |
| aix       | ppc64    |
| darwin    | 386      |
| darwin    | amd64    |
| darwin    | arm      |
| darwin    | arm64    |
| dragonfly | amd64    |
| freebsd   | 386      |
| freebsd   | amd64    |
| freebsd   | arm      |
| illumos   | amd64    |
| linux     | 386      |
| linux     | amd64    |
| linux     | arm      |
| linux     | arm64    |
| linux     | ppc64    |
| linux     | ppc64le  |
| linux     | mips     |
| linux     | mipsle   |
| linux     | mips64   |
| linux     | mips64le |
| linux     | s390x    |
| netbsd    | 386      |
| netbsd    | amd64    |
| netbsd    | arm      |
| openbsd   | 386      |
| openbsd   | amd64    |
| openbsd   | arm      |
| openbsd   | arm64    |
| plan9     | 386      |
| plan9     | amd64    |
| plan9     | arm      |
| solaris   | amd64    |
| windows   | 386      |
| windows   | amd64    |
| ...       | ...      |

## License

Licensed under The GPLv3 License
