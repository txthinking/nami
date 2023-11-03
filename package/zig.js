// check os
if (!(nami.os == "darwin" && nami.arch == "arm64") && !(nami.os == "darwin" && nami.arch == "amd64") && !(nami.os == "linux" && nami.arch == "arm64") && !(nami.os == "linux" && nami.arch == "amd64")) {
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
// var s = $1("curl -L https://ziglang.org/download/index.json")
var v = "0.12.0-dev.1297+a9e66ed73"; // force version since zig still not 1.0
await writefile(`${nami.cache_dir}/version`, v)

var s = ""
if (nami.os == "darwin" && nami.arch == "arm64") {
    s = "macos-aarch64"
}
if (nami.os == "darwin" && nami.arch == "amd64") {
    s = "macos-x86_64"
}
if (nami.os == "linux" && nami.arch == "arm64") {
    s = "linux-aarch64"
}
if (nami.os == "linux" && nami.arch == "amd64") {
    s = "linux-x86_64"
}
s = `zig-${s}-${v}`
$(`curl -L --progress-bar https://ziglang.org/builds/${s}.tar.xz -o /tmp/_.txz`)
$`rm -rf /tmp/_`
$`mkdir /tmp/_`
$`tar Jxvf /tmp/_.txz -C /tmp/_`
$(`mv /tmp/_/${s} ${nami.cache_dir}/zig`)
write_file(`${nami.cache_dir}/links`, "zig/zig\n")

