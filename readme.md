# Nami

A decentralized binary package manager

### Why

There are already many package managers, more are centralized and often provide outdated softwares.
Nami is a decentralized binary package manager,
she allows software authors to publish their software anywhere.
No longer have to worry about users downloading outdated software.

### Install

    $ curl https://raw.githubusercontent.com/txthinking/nami/master/install.sh | bash && exec -l $SHELL

### Usage

    NAME:
       nami - A decentralized binary package manager

    USAGE:
       nami [global options] command [command options] [arguments...]

    COMMANDS:
       install  Install package. $ nami install github.com/txthinking/nami
       upgrade  Upgrade package. $ nami upgrade github.com/txthinking/nami
       remove   Remove package. $ nami remove github.com/txthinking/joker
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

-   Package name such as `yourdomain.com/package`
-   Nami will send GET request to `https://yourdomain.com/package/nami.json`, `nami.json` such as:
    ```
    {
        "version": "xxx",
        "files": [
            "https://anydomain.com/anypath/BINARYNAME1_OS_ARCH",
            "https://anydomain.com/anypath/BINARYNAME2_OS_ARCH",
        ]
    }
    ```

### Built-in supported domains

* `github.com`: Package name such as `github.com/txthinking/nami`, put binary files in the [github releases](https://github.com/txthinking/nami/releases)

### OS & ARCH

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

## License

Licensed under The GPLv3 License
