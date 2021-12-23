import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("deno");
n.open_sourced_on("https://github.com/denoland/deno");

var r = await n.fetch("https://api.github.com/repos/denoland/deno/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_commands_from_zip_url(`https://github.com/denoland/deno/releases/latest/download/deno-aarch64-apple-darwin.zip`, {
        'deno': 'deno',
    });
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/denoland/deno/releases/latest/download/deno-x86_64-apple-darwin.zip`, {
        'deno': 'deno',
    });
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/denoland/deno/releases/latest/download/deno-x86_64-unknown-linux-gnu.zip`, {
        'deno': 'deno',
    });
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/denoland/deno/releases/latest/download/deno-x86_64-pc-windows-msvc.zip`, {
        'deno.exe': 'deno.exe',
    });
    Deno.exit(0);
}
n.unsupport();
