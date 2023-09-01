// check os
if(!(nami.os == "darwin" && nami.arch == "arm64") &&
    !(nami.os == "darwin" && nami.arch == "amd64") &&
    !(nami.os == "linux" && nami.arch == "amd64")){
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
var s = $1("curl -L https://api.github.com/repos/sharkdp/fd/releases/latest")
var v = JSON.parse(s).tag_name
await writefile(`${nami.cache_dir}/version`, v)

// download and copy command files into nami.cache_dir
if(nami.os == "darwin" && nami.arch == "arm64"){
    echo("There is no arm64 package, will install amd64 package.")
    s = "fd-"+v+"-x86_64-apple-darwin"
}
if(nami.os == "darwin" && nami.arch == "amd64"){
    s = "fd-"+v+"-x86_64-apple-darwin"
}
if(nami.os == "linux"){
    s = "fd-"+v+"x86_64-unknown-linux-gnu"
}
cp(`https://github.com/sharkdp/fd/releases/latest/download/${s}.tar.gz`, `${s}/fd`, `${nami.cache_dir}/fd`)
