import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("testsocks5");
n.open_sourced_on("https://github.com/txthinking/testsocks5");

var r = await n.fetch("https://api.github.com/repos/brook-community/testsocks5/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_command_from_url("https://github.com/txthinking/testsocks5/releases/latest/download/testsocks5_darwin_arm64", "testsocks5");
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/testsocks5/releases/latest/download/testsocks5_darwin_amd64", "testsocks5");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/testsocks5/releases/latest/download/testsocks5_linux_amd64", "testsocks5");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/testsocks5/releases/latest/download/testsocks5_windows_amd64", "testsocks5.exe");
    Deno.exit(0);
}
n.unsupport();
