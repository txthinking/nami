# Nami

[中文](readme_zh.md)

[🗣 News](https://t.me/txthinking_news)
[💬 Chat](https://join.txthinking.com)
[🩸 Youtube](https://www.youtube.com/txthinking)
[❤️ Sponsor](https://github.com/sponsors/txthinking)

The easy way to download anything from anywhere. All files are stored in `$HOME/.nami`.

❤️ A project by [txthinking.com](https://www.txthinking.com)

### Install

    bash <(curl https://bash.ooo/nami.sh)

> Windows user should run in [Git Bash](https://gitforwindows.org/), [Video](https://www.youtube.com/watch?v=CioIqzSlXl8)

### Example

```
nami install brook
nami list
nami remove brook
```

You can also upgrade nami by nami

```
nami install nami
```

### With HTTPS_PROXY environment

```
export HTTPS_PROXY=http://127.0.0.1:8010
nami install brook
```

### Keep PATH with sudo

```
sudo visudo
```

```
Defaults        !env_reset
# Defaults       secure_path=...
```

### All officially maintained packages

[package](package)

### How to add package

[package/readme.md](package/readme.md)

## License

Licensed under The GPLv3 License
