# Nami

[English](readme.md)

[🗣 News](https://t.me/txthinking_news)
[💬 Chat](https://join.txthinking.com)
[🩸 Youtube](https://www.youtube.com/txthinking) 
[❤️ Sponsor](https://github.com/sponsors/txthinking)

简单的从任何地方下载命令. Nami只借助deno脚本下载命令, 不编译也不下载额外的编译链工具. 所有的文件都存储在 `$HOME/.nami` 目录下.

❤️ A project by [txthinking.com](https://www.txthinking.com)

### 安装

    bash <(curl https://bash.ooo/nami.sh)

> Windows 用户应该使用 [Git Bash](https://gitforwindows.org/) 运行命令, [视频](https://www.youtube.com/watch?v=CioIqzSlXl8)

### 举例

```
nami install nami
```

```
nami install brook ipio nico
```

```
nami remove nico
```

```
nami list
```

### 支持 HTTPS_PROXY 环境变量

```
export HTTPS_PROXY=http://127.0.0.1:8888
nami install brook
```

### 保持 sudo PATH

```
sudo visudo
```

```
Defaults        !env_reset
# Defaults       secure_path=...
```

### 官方维护的所有包

[package](package)

### 如何添加包

[package/readme.md](package/readme.md)


## 开源协议

基于 GPLv3 协议开源
