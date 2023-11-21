// check os
if (!(nami.os == "linux" && nami.arch == "amd64")) {
    echo("This package does not support your OS or Arch now. PR welcome: https://github.com/txthinking/nami/blob/master/package")
    exit(1)
}

// version
var s = $1("curl -L https://api.github.com/repos/neovim/neovim/releases/latest")
var v = JSON.parse(s).tag_name
write_file(`${nami.cache_dir}/version`, v)

if (nami.os != "windows") {
    var s = ""
    if (nami.os == "linux" && nami.arch == "amd64") {
        s = "nvim-linux64"
    }
    $(`curl -L --progress-bar https://github.com/neovim/neovim/releases/latest/download/${s}.tar.gz -o /tmp/_.tgz`)
    $`rm -rf /tmp/_`
    $`mkdir /tmp/_`
    $`tar zxvf /tmp/_.tgz -C /tmp/_`
    $(`mv /tmp/_/${s} ${nami.cache_dir}/nvim`)
    write_file(`${nami.cache_dir}/links`, "nvim/bin/nvim\n")
}
