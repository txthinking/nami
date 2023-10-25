// check os
if(!(nami.os == "darwin" && nami.arch == "arm64") &&
    !(nami.os == "darwin" && nami.arch == "amd64")){
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
var s = $1("curl -L https://api.github.com/repos/marler8997/zigup/releases/latest")
var v = JSON.parse(s).tag_name
await writefile(`${nami.cache_dir}/version`, v)

// download and copy command files into nami.cache_dir
if(nami.os == "darwin" && nami.arch == "arm64"){
    s = "macos-latest-aarch64"
}
if(nami.os == "darwin" && nami.arch == "amd64"){
    s = "macos-latest-x86_64"
}
cp(`https://github.com/marler8997/zigup/releases/latest/download/zigup.${s}.zip`, `zigup`, `${nami.cache_dir}/zigup`)
