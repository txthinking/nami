import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("jinbe");
n.open_sourced_on("https://github.com/txthinking/jinbe");

var r = await n.fetch("https://api.github.com/repos/txthinking/jinbe/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/txthinking/jinbe/releases/latest/download/jinbe_darwin_arm64", "jinbe");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/jinbe/releases/latest/download/jinbe_darwin_amd64", "jinbe");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/jinbe/releases/latest/download/jinbe_linux_amd64", "jinbe");
    Deno.exit(0);
}
n.unsupport();
