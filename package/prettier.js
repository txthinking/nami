import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';
import { join } from "https://deno.land/std@0.126.0/path/mod.ts";

var n = nami("prettier");
n.open_sourced_on("https://github.com/prettier/prettier");

await n.version('unknown');

if(Deno.build.os == "darwin" && Deno.build.arch == "aarch64"){
    await Deno.writeFile(`${join(Deno.env.get("HOME"), ".nami", "cache", "prettier")}`, new TextEncoder().encode('sh -c "npx --yes prettier $*"'));
    Deno.exit(0);
}
if(Deno.build.os == "darwin" && Deno.build.arch == "x86_64"){
    await Deno.writeFile(`${join(Deno.env.get("HOME"), ".nami", "cache", "prettier")}`, new TextEncoder().encode('sh -c "npx --yes prettier $*"'));
    Deno.exit(0);
}
if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await Deno.writeFile(`${join(Deno.env.get("HOME"), ".nami", "cache", "prettier")}`, new TextEncoder().encode('sh -c "npx --yes prettier $*"'));
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await Deno.writeFile(`${join(Deno.env.get("HOME"), ".nami", "cache", "prettier")}`, new TextEncoder().encode('sh -c "npx --yes prettier $*"'));
    Deno.exit(0);
}
n.unsupport();
