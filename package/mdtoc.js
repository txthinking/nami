import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("mdtoc");
n.open_sourced_on("https://gist.github.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1");

await n.version("1");

console.log("$ mdtoc xxx.md")
console.log("$ mdtoc1d xxx.md")

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc", "mdtoc");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc1d", "mdtoc1d");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc", "mdtoc");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc1d", "mdtoc1d");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc", "mdtoc");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc1d", "mdtoc1d");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc", "mdtoc");
    await n.download_command_from_url("https://gist.githubusercontent.com/txthinking/b8915f0b15a761833bc89ee9a60bbda1/raw/f967f7565578ad64c172eeaa030f367db2a55f06/mdtoc1d", "mdtoc1d");
    Deno.exit(0);
}
n.unsupport();
