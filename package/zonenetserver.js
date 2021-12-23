import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("zonenetserver");
n.not_open_sourced_on("https://github.com/zonenetio/zonenetserver");

var r = await n.fetch("https://api.github.com/repos/zonenetio/zonenetserver/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/zonenetio/zonenetserver/releases/latest/download/zonenetserver_darwin_amd64", "zonenetserver");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/zonenetio/zonenetserver/releases/latest/download/zonenetserver_linux_amd64", "zonenetserver");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/zonenetio/zonenetserver/releases/latest/download/zonenetserver_windows_amd64.exe", "zonenetserver.exe");
    Deno.exit(0);
}
n.unsupport();
