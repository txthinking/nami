import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("mr2");
n.open_sourced_on("https://github.com/txthinking/mr2");

var r = await n.fetch("https://api.github.com/repos/txthinking/mr2/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/txthinking/mr2/releases/latest/download/mr2_darwin_arm64", "mr2");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/mr2/releases/latest/download/mr2_darwin_amd64", "mr2");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/mr2/releases/latest/download/mr2_linux_amd64", "mr2");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/mr2/releases/latest/download/mr2_windows_amd64.exe", "mr2.exe");
    Deno.exit(0);
}
n.unsupport();
