// check os
if(!(nami.os == "linux" && nami.arch == "amd64") &&
    !(nami.os == "linux" && nami.arch == "arm64")){
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
var s = $1("curl -L https://api.github.com/repos/txthinking/bash/releases/latest")
var v = JSON.parse(s).tag_name
await writefile(`${nami.cache_dir}/version`, v)

// download and copy command files into nami.cache_dir
cp(`https://github.com/txthinking/bash/releases/latest/download/brook_${nami.os}_${nami.arch}${nami.os == "windows" ? '.exe' : ''}`, `${nami.cache_dir}/brook${nami.os == "windows" ? '.exe' : ''}`)
