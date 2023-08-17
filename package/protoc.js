// check os
if(!(nami.os == "darwin" && nami.arch == "arm64") &&
    !(nami.os == "darwin" && nami.arch == "amd64") &&
    !(nami.os == "linux" && nami.arch == "amd64") &&
    !(nami.os == "windows" && nami.arch == "amd64")){
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
var s = $1("curl -L https://api.github.com/repos/protocolbuffers/protobuf/releases/latest")
var v = JSON.parse(s).tag_name
await writefile(`${nami.cache_dir}/version`, v)

// download and copy command files into nami.cache_dir
if(nami.os == "darwin" && nami.arch == "arm64"){
    s = "osx-aarch_64"
}
if(nami.os == "darwin" && nami.arch == "amd64"){
    s = "osx-x86_64"
}
if(nami.os == "linux"){
    s = "linux-x86_64"
}
var exe = ""
if(nami.os == "windows"){
    s = "win64"
    exe = ".exe"
}
cp(`https://github.com/protocolbuffers/protobuf/releases/latest/download/protoc-${v.substr(1)}-${s}.zip`, `bin/protoc${exe}`, `${nami.cache_dir}/protoc${exe}`)
