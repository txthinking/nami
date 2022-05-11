import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("marp");
n.open_sourced_on("https://github.com/marp-team/marp-cli");

var r = await n.fetch("https://api.github.com/repos/marp-team/marp-cli/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/marp-team/marp-cli/releases/latest/download/marp-cli-${j.tag_name}-mac.tar.gz`, {
        'marp': 'marp',
    });
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/marp-team/marp-cli/releases/latest/download/marp-cli-${j.tag_name}-linux.tar.gz`, {
        'marp': 'marp',
    });
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/marp-team/marp-cli/releases/latest/download/marp-cli-${j.tag_name}-win.zip`, {
        'marp.exe': 'marp.exe',
    });
    Deno.exit(0);
}
n.unsupport();
