import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("cloudupload");
n.open_sourced_on("https://github.com/txthinking/cloudupload");

var r = await n.fetch("https://api.github.com/repos/txthinking/cloudupload/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/cloudupload/releases/latest/download/cloudupload_darwin_amd64", "cloudupload");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/cloudupload/releases/latest/download/cloudupload_linux_amd64", "cloudupload");
    Deno.exit(0);
}
n.unsupport();
