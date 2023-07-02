// check os
if(!(nami.os == "darwin" && nami.arch == "arm64") &&
    !(nami.os == "darwin" && nami.arch == "amd64") &&
    !(nami.os == "linux" && nami.arch == "amd64") &&
    !(nami.os == "linux" && nami.arch == "arm64")){
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
var s = $1("curl -L https://api.github.com/repos/superfly/flyctl/releases/latest")
var v = JSON.parse(s).tag_name
await writefile(`${nami.cache_dir}/version`, v)

// download and copy command files into nami.cache_dir
if (nami.os == "darwin" && nami.arch == "arm64") {
    cp(`https://github.com/superfly/flyctl/releases/latest/download/flyctl_${v.substr(1)}_macOS_arm64.tar.gz`, {
        'flyctl': `${nami.cache_dir}/flyctl`,
    })
}
if (nami.os == "darwin" && nami.arch == "amd64") {
    cp(`https://github.com/superfly/flyctl/releases/latest/download/flyctl_${v.substr(1)}_macOS_x86_64.tar.gz`, {
        'flyctl': `${nami.cache_dir}/flyctl`,
    })
}
if (nami.os == "linux" && nami.arch == "amd64") {
    cp(`https://github.com/superfly/flyctl/releases/latest/download/flyctl_${v.substr(1)}_Linux_x86_64.tar.gz`, {
        'flyctl': `${nami.cache_dir}/flyctl`,
    })
}
if (nami.os == "linux" && nami.arch == "amd64") {
    cp(`https://github.com/superfly/flyctl/releases/latest/download/flyctl_${v.substr(1)}_Linux_arm64.tar.gz`, {
        'flyctl': `${nami.cache_dir}/flyctl`,
    })
}
