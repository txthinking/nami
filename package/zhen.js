// check os
if(!(nami.os == "darwin" && nami.arch == "arm64") && !(nami.os == "darwin" && nami.arch == "amd64") && !(nami.os == "linux" && nami.arch == "amd64") && !(nami.os == "linux" && nami.arch == "arm64")){
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
var s = $1("curl -L https://api.github.com/repos/txthinking/zhen/releases/latest")
var v = JSON.parse(s).tag_name
v = "v20231111" // TODO
write_file(`${nami.cache_dir}/version`, v)

// download and copy command files into nami.cache_dir
cp(`https://github.com/txthinking/zhen/releases/latest/download/zhen_${nami.os}_${nami.arch}`, `${nami.cache_dir}/zhen`)
