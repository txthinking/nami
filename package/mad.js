import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("mad");
n.open_sourced_on("https://github.com/txthinking/mad");

var r = await n.fetch("https://api.github.com/repos/txthinking/mad/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/txthinking/mad/releases/latest/download/mad_darwin_arm64", "mad");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/mad/releases/latest/download/mad_darwin_amd64", "mad");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/mad/releases/latest/download/mad_linux_amd64", "mad");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/mad/releases/latest/download/mad_windows_amd64.exe", "mad.exe");
    Deno.exit(0);
}
n.unsupport();
