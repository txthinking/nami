import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("testbrook");
n.open_sourced_on("https://github.com/txthinking/testbrook");

var r = await n.fetch("https://api.github.com/repos/txthinking/testbrook/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/txthinking/testbrook/releases/latest/download/testbrook_darwin_arm64", "testbrook");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/testbrook/releases/latest/download/testbrook_darwin_amd64", "testbrook");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/testbrook/releases/latest/download/testbrook_linux_amd64", "testbrook");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/testbrook/releases/latest/download/testbrook_windows_amd64.exe", "testbrook.exe");
    Deno.exit(0);
}
n.unsupport();
