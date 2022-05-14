import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("tengo");
n.open_sourced_on("https://github.com/d5/tengo");

var r = await n.fetch("https://api.github.com/repos/d5/tengo/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/d5/tengo/releases/latest/download/tengo_${j.tag_name.replace('v', '')}_darwin_amd64.tar.gz`, {
        'tengo': 'tengo',
    });
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/d5/tengo/releases/latest/download/tengo_${j.tag_name.replace('v', '')}_linux_amd64.tar.gz`, {
        'tengo': 'tengo',
    });
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/d5/tengo/releases/latest/download/tengo_${j.tag_name.replace('v', '')}_windows_amd64.tar.gz`, {
        'tengo.exe': 'tengo.exe',
    });
    Deno.exit(0);
}
n.unsupport();
