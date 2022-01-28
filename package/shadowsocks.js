import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("shadowsocks");
n.open_sourced_on("https://github.com/shadowsocks/shadowsocks-rust");

var r = await n.fetch("https://api.github.com/repos/shadowsocks/shadowsocks-rust/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_commands_from_tgz_url(`https://github.com/shadowsocks/shadowsocks-rust/releases/latest/download/shadowsocks-${j.tag_name}.aarch64-apple-darwin.tar.xz`, {
        'sslocal': 'sslocal',
        'ssserver': 'ssserver',
        'ssurl': 'ssurl',
        'ssservice': 'ssservice',
    });
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/shadowsocks/shadowsocks-rust/releases/latest/download/shadowsocks-${j.tag_name}.x86_64-apple-darwin.tar.xz`, {
        'sslocal': 'sslocal',
        'ssserver': 'ssserver',
        'ssurl': 'ssurl',
        'ssservice': 'ssservice',
    });
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/shadowsocks/shadowsocks-rust/releases/latest/download/shadowsocks-${j.tag_name}.x86_64-unknown-linux-gnu.tar.xz`, {
        'sslocal': 'sslocal',
        'ssserver': 'ssserver',
        'ssurl': 'ssurl',
        'ssmanager': 'ssmanager',
        'ssservice': 'ssservice',
    });
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/shadowsocks/shadowsocks-rust/releases/latest/download/shadowsocks-${j.tag_name}.x86_64-pc-windows-msvc.zip`, {
        'sslocal.exe': 'sslocal.exe',
        'ssserver.exe': 'ssserver.exe',
        'ssurl.exe': 'ssurl.exe',
        'ssmanager.exe': 'ssmanager.exe',
        'ssservice.exe': 'ssservice.exe',
    });
    Deno.exit(0);
}
n.unsupport();
