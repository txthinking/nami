import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("cowsay");
n.open_sourced_on("https://github.com/Code-Hex/Neo-cowsay");

var r = await n.fetch("https://api.github.com/repos/Code-Hex/Neo-cowsay/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_commands_from_tgz_url(`https://github.com/Code-Hex/Neo-cowsay/releases/latest/download/cowsay_${j.tag_name.replace("v","")}_macOS_arm64.tar.gz`, {
        'cowsay': 'cowsay',
        'cowthink': 'cowthink',
    });
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/junegunn/Code-Hex/Neo-cowsay/latest/download/cowsay_${j.tag_name.replace("v","")}_macOS_x86_64.tar.gz`, {
        'cowsay': 'cowsay',
        'cowthink': 'cowthink',
    });
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/Code-Hex/Neo-cowsay/releases/latest/download/cowsay_${j.tag_name.replace("v","")}_Linux_x86_64.tar.gz`, {
        'cowsay': 'cowsay',
        'cowthink': 'cowthink',
    });
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/Code-Hex/Neo-cowsay/releases/latest/download/cowsay_${j.tag_name.replace("v","")}_Windows_x86_64.zip`, {
        'cowsay.exe': 'cowsay.exe',
        'cowthink.exe': 'cowthink.exe',
    });
    Deno.exit(0);
}
n.unsupport();
