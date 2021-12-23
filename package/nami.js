import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("nami");
n.open_sourced_on("https://github.com/txthinking/nami");

var r = await n.fetch("https://api.github.com/repos/txthinking/nami/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/txthinking/nami/releases/latest/download/nami_darwin_arm64", "nami");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/nami/releases/latest/download/nami_darwin_amd64", "nami");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/nami/releases/latest/download/nami_linux_amd64", "nami");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/nami/releases/latest/download/nami_windows_amd64.exe", "nami.exe");
    Deno.exit(0);
}
n.unsupport();
