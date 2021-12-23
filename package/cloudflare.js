import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("cloudflare");
n.open_sourced_on("https://github.com/txthinking/cloudflare");

var r = await n.fetch("https://api.github.com/repos/txthinking/cloudflare/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/cloudflare/releases/latest/download/cloudflare_darwin_amd64", "cloudflare");
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/cloudflare/releases/latest/download/cloudflare_linux_amd64", "cloudflare");
    Deno.exit(0);
}
n.unsupport();
