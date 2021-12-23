import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("zonenetclient");
n.not_open_sourced_on("https://github.com/zonenetio/zonenetclient");

var r = await n.fetch("https://api.github.com/repos/zonenetio/zonenetclient/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/zonenetio/zonenetclient/releases/latest/download/zonenetclient_darwin_arm64", "zonenetclient");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/zonenetio/zonenetclient/releases/latest/download/zonenetclient_darwin_amd64", "zonenetclient");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/zonenetio/zonenetclient/releases/latest/download/zonenetclient_linux_amd64", "zonenetclient");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/zonenetio/zonenetclient/releases/latest/download/zonenetclient_windows_amd64.exe", "zonenetclient.exe");
    Deno.exit(0);
}
n.unsupport();
