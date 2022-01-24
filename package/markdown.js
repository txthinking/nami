
import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("markdown");
n.open_sourced_on("https://github.com/txthinking/markdown");

var r = await n.fetch("https://api.github.com/repos/txthinking/markdown/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/txthinking/markdown/releases/latest/download/markdown_darwin_arm64", "markdown");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc", "mdtoc");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc1d", "mdtoc1d");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/markdown/releases/latest/download/markdown_darwin_amd64", "markdown");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc", "mdtoc");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc1d", "mdtoc1d");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/markdown/releases/latest/download/markdown_linux_amd64", "markdown");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc", "mdtoc");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc1d", "mdtoc1d");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/markdown/releases/latest/download/markdown_windows_amd64.exe", "markdown.exe");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc", "mdtoc");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc1d", "mdtoc1d");
    Deno.exit(0);
}
n.unsupport();
