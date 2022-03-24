import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("denobundle");
n.open_sourced_on("https://github.com/txthinking/denobundle");

var r = await n.fetch("https://api.github.com/repos/txthinking/denobundle/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/txthinking/denobundle/releases/latest/download/denobundle_darwin_arm64", "denobundle");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/denobundle/releases/latest/download/denobundle_darwin_amd64", "denobundle");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/denobundle/releases/latest/download/denobundle_linux_amd64", "denobundle");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/denobundle/releases/latest/download/denobundle_windows_amd64.exe", "denobundle.exe");
    Deno.exit(0);
}
n.unsupport();
