// check os
if (!(nami.os == "linux" && nami.arch == "arm64") && !(nami.os == "linux" && nami.arch == "amd64")) {
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
var s = $1("curl -L https://api.github.com/repos/Kitware/CMake/releases/latest")
var v = JSON.parse(s).tag_name
write_file(`${nami.cache_dir}/version`, v)

var s = ""
if (nami.os == "linux" && nami.arch == "arm64") {
    s = `cmake-${v.slice(1)}-linux-aarch64`
}
if (nami.os == "linux" && nami.arch == "amd64") {
    s = `cmake-${v.slice(1)}-linux-x86_64`
}
$(`curl -L --progress-bar https://github.com/Kitware/CMake/releases/latest/download/${s}.tar.gz -o /tmp/_.tgz`)
$`rm -rf /tmp/_`
$`mkdir /tmp/_`
$`tar zxvf /tmp/_.tgz -C /tmp/_`
$(`mv /tmp/_/${s} ${nami.cache_dir}/cmake`)
write_file(`${nami.cache_dir}/links`, "cmake/bin/ccmake\n")
append_file(`${nami.cache_dir}/links`, "cmake/bin/cmake\n")
append_file(`${nami.cache_dir}/links`, "cmake/bin/cmake-gui\n")
append_file(`${nami.cache_dir}/links`, "cmake/bin/cpack\n")
append_file(`${nami.cache_dir}/links`, "cmake/bin/ctest\n")
