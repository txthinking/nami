// version
var s = $1("curl -L https://api.github.com/repos/shadowsocks/shadowsocks-rust/releases/latest")
var v = JSON.parse(s).tag_name
await writefile(`${nami.cache_dir}/version`, v)

// check os
if(!(nami.os == "darwin" && nami.arch == "arm64") &&
    !(nami.os == "darwin" && nami.arch == "amd64") &&
    !(nami.os == "linux" && nami.arch == "amd64") &&
    !(nami.os == "windows" && nami.arch == "amd64")){
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// download and copy command files into nami.cache_dir
if (nami.os == "darwin" && nami.arch == "arm64") {
    cp(`https://github.com/shadowsocks/shadowsocks-rust/releases/latest/download/shadowsocks-${v}.aarch64-apple-darwin.tar.xz`, {
        'sslocal': `${nami.cache_dir}/sslocal`,
        'ssserver': `${nami.cache_dir}/ssserver`,
        'ssurl': `${nami.cache_dir}/ssurl`,
        'ssservice': `${nami.cache_dir}/ssservice`,
    })
}
if (nami.os == "darwin" && nami.arch == "amd64") {
    cp(`https://github.com/shadowsocks/shadowsocks-rust/releases/latest/download/shadowsocks-${v}.x86_64-apple-darwin.tar.xz`, {
        'sslocal': `${nami.cache_dir}/sslocal`,
        'ssserver': `${nami.cache_dir}/ssserver`,
        'ssurl': `${nami.cache_dir}/ssurl`,
        'ssservice': `${nami.cache_dir}/ssservice`,
    })
}
if (nami.os == "linux" && nami.arch == "amd64") {
    cp(`https://github.com/shadowsocks/shadowsocks-rust/releases/latest/download/shadowsocks-${v}.x86_64-unknown-linux-gnu.tar.xz`, {
        'sslocal': `${nami.cache_dir}/sslocal`,
        'ssserver': `${nami.cache_dir}/ssserver`,
        'ssurl': `${nami.cache_dir}/ssurl`,
        'ssservice': `${nami.cache_dir}/ssservice`,
        'ssmanager': `${nami.cache_dir}/ssmanager`,
    })
}
if (nami.os == "windows" && nami.arch == "amd64") {
    cp(`https://github.com/shadowsocks/shadowsocks-rust/releases/latest/download/shadowsocks-${v}.x86_64-pc-windows-msvc.zip`, {
        'sslocal.exe': `${nami.cache_dir}/sslocal.exe`,
        'ssserver.exe': `${nami.cache_dir}/ssserver.exe`,
        'ssurl.exe': `${nami.cache_dir}/ssurl.exe`,
        'ssservice.exe': `${nami.cache_dir}/ssservice.exe`,
        'ssmanager.exe': `${nami.cache_dir}/ssmanager.exe`,
    })
}
