import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';
import { join } from "https://deno.land/std@0.126.0/path/mod.ts";

var n = nami("fzf");
n.open_sourced_on("https://github.com/junegunn/fzf");

var r = await n.fetch("https://api.github.com/repos/junegunn/fzf/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await n.download_commands_from_zip_url(`https://github.com/junegunn/fzf/releases/latest/download/fzf-${j.tag_name}-darwin_arm64.zip`, {
        'fzf': 'fzf',
    });
    await Deno.writeFile(`${join(Deno.env.get("HOME"), ".nami", "cache", "vimf")}`, new TextEncoder().encode("#!/bin/bash\nvim $(fzf)\n"));
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/junegunn/fzf/releases/latest/download/fzf-${j.tag_name}-darwin_amd64.zip`, {
        'fzf': 'fzf',
    });
    await Deno.writeFile(`${join(Deno.env.get("HOME"), ".nami", "cache", "vimf")}`, new TextEncoder().encode("#!/bin/bash\nvim $(fzf)\n"));
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/junegunn/fzf/releases/latest/download/fzf-${j.tag_name}-linux_amd64.tar.gz`, {
        'fzf': 'fzf',
    });
    await Deno.writeFile(`${join(Deno.env.get("HOME"), ".nami", "cache", "vimf")}`, new TextEncoder().encode("#!/bin/bash\nvim $(fzf)\n"));
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/junegunn/fzf/releases/latest/download/fzf-${j.tag_name}-windows_amd64.zip`, {
        'fzf.exe': 'fzf.exe',
    });
    Deno.exit(0);
}
n.unsupport();
