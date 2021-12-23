import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("filelink");
n.not_open_sourced_on("https://filelink.io");

var r = await n.fetch("https://api.github.com/repos/txthinking/filelink/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/txthinking/filelink/releases/latest/download/filelink_darwin_arm64", "filelink");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/filelink/releases/latest/download/filelink_darwin_amd64", "filelink");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/filelink/releases/latest/download/filelink_linux_amd64", "filelink");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/filelink/releases/latest/download/filelink_windows_amd64.exe", "filelink.exe");
    Deno.exit(0);
}
n.unsupport();
