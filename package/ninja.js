// check os
if(!(nami.os == "linux" && nami.arch == "amd64")){
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
var s = $1("curl -L https://api.github.com/repos/ninja-build/ninja/releases/latest")
var v = JSON.parse(s).tag_name
write_file(`${nami.cache_dir}/version`, v)

// download and copy command files into nami.cache_dir
if (nami.os == "linux" && nami.arch == "amd64") {
    cp(`https://github.com/ninja-build/ninja/releases/latest/download/ninja-linux.zip`, {
        'ninja': `${nami.cache_dir}/ninja`,
    })
}
