import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("hey");
n.open_sourced_on("https://github.com/rakyll/hey");

var r = await n.fetch("https://api.github.com/repos/rakyll/hey/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://hey-release.s3.us-east-2.amazonaws.com/hey_darwin_amd64", "hey");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://hey-release.s3.us-east-2.amazonaws.com/hey_linux_amd64", "hey");
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://hey-release.s3.us-east-2.amazonaws.com/hey_windows_amd64", "hey.exe");
    Deno.exit(0);
}
n.unsupport();
