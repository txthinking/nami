import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("caddy");
n.open_sourced_on("https://github.com/caddyserver/caddy");

var r = await n.fetch("https://api.github.com/repos/caddyserver/caddy/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_commands_from_tgz_url(`https://github.com/caddyserver/caddy/releases/latest/download/caddy_${j.tag_name.replace('v', '')}_mac_arm64.tar.gz`, {
        'caddy': 'caddy',
    });
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/caddyserver/caddy/releases/latest/download/caddy_${j.tag_name.replace('v', '')}_mac_amd64.tar.gz`, {
        'caddy': 'caddy',
    });
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/caddyserver/caddy/releases/latest/download/caddy_${j.tag_name.replace('v', '')}_linux_amd64.tar.gz`, {
        'caddy': 'caddy',
    });
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/caddyserver/caddy/releases/latest/download/caddy_${j.tag_name.replace('v', '')}_windows_amd64.zip`, {
        'caddy.exe': 'caddy.exe',
    });
    Deno.exit(0);
}
n.unsupport();
