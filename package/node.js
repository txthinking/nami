// check os
if (!(nami.os == "darwin" && nami.arch == "arm64") && !(nami.os == "darwin" && nami.arch == "amd64") && !(nami.os == "linux" && nami.arch == "arm64") && !(nami.os == "linux" && nami.arch == "amd64") && !(nami.os == "windows" && nami.arch == "amd64")) {
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
var s = $1("curl -L https://nodejs.org/download/release/index.json")
var v = JSON.parse(s).find(v => v.lts).version
await writefile(`${nami.cache_dir}/version`, v)

if (nami.os != "windows") {
    var s = ""
    if (nami.os == "darwin" && nami.arch == "arm64") {
        s = "darwin-arm64"
    }
    if (nami.os == "darwin" && nami.arch == "amd64") {
        s = "darwin-x64"
    }
    if (nami.os == "linux" && nami.arch == "arm64") {
        s = "linux-arm64"
    }
    if (nami.os == "linux" && nami.arch == "amd64") {
        s = "linux-x64"
    }
    s = `node-${v}-${s}`
    $(`curl -L --progress-bar https://nodejs.org/dist/${v}/${s}.tar.gz -o /tmp/_.tgz`)
    $`rm -rf /tmp/_`
    $`mkdir /tmp/_`
    $`tar zxvf /tmp/_.tgz -C /tmp/_`
    $(`mv /tmp/_/${s} ${nami.cache_dir}/node`)
    write_file(`${nami.cache_dir}/links`, "node/bin/node\n")
    append_file(`${nami.cache_dir}/links`, "node/bin/corepack\n")
    append_file(`${nami.cache_dir}/links`, "node/bin/npm\n")
    append_file(`${nami.cache_dir}/links`, "node/bin/npx\n")
}
if (nami.os == "windows") {
    if (!which("7z")) {
        throw 'need 7z, recommend $ nami install 7z';
    }
    var s = `node-${v}-win-x64`
    $(`curl -L --progress-bar https://nodejs.org/dist/${v}/${s}.zip -o /tmp/_.zip`)
    $`rm -rf /tmp/_`
    $`mkdir /tmp/_`
    $`7z x /tmp/_.zip -o/tmp/_`
    $(`mv /tmp/_/${s} ${nami.cache_dir}/node`)
    write_file(`${nami.cache_dir}/links`, "node/bin/node.exe\n")
    append_file(`${nami.cache_dir}/links`, "node/bin/corepack\n")
    append_file(`${nami.cache_dir}/links`, "node/bin/npm\n")
    append_file(`${nami.cache_dir}/links`, "node/bin/npx\n")
}
