import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("hancock");
n.open_sourced_on("https://github.com/txthinking/hancock");

var r = await n.fetch("https://api.github.com/repos/txthinking/hancock/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/txthinking/hancock/releases/latest/download/hancock_darwin_arm64", "hancock");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/hancock/releases/latest/download/hancock_darwin_amd64", "hancock");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/hancock/releases/latest/download/hancock_linux_amd64", "hancock");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/hancock/releases/latest/download/hancock_windows_amd64.exe", "hancock.exe");
    Deno.exit(0);
}
n.unsupport();
