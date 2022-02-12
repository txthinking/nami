import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("minify");
n.open_sourced_on("https://github.com/tdewolff/minify");

var r = await n.fetch("https://api.github.com/repos/tdewolff/minify/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/tdewolff/minify/releases/latest/download/minify_darwin_amd64.tar.gz`, {
        'minify': 'minify',
    });
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/tdewolff/minify/releases/latest/download/minify_linux_amd64.tar.gz`, {
        'minify': 'minify',
    });
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/tdewolff/minify/releases/latest/download/minify_windows_amd64.zip`, {
        'minify.exe': 'minify.exe',
    });
    Deno.exit(0);
}
n.unsupport();
