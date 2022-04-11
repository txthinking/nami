import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("brookscript");
n.open_sourced_on("https://github.com/txthinking/bash");

var r = await n.fetch("https://api.github.com/repos/txthinking/bash/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_command_from_url("https://github.com/txthinking/bash/releases/latest/download/brookscript_linux_amd64", "brookscript");
    Deno.exit(0);
}
n.unsupport();
