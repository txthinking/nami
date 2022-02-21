import nami from "https://raw.githubusercontent.com/txthinking/nami/master/nami.js";
import { join } from "https://deno.land/std@0.126.0/path/mod.ts";

var n = nami("ipio");
n.not_open_sourced_on("https://github.com/txthinking/ipio");

var r = await n.fetch("https://api.github.com/repos/txthinking/ipio/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if (Deno.build.os == "darwin" && Deno.build.arch == "aarch64") {
    await n.download_command_from_url("https://github.com/txthinking/ipio/releases/latest/download/ipio_darwin_arm64", "ipio");
    Deno.exit(0);
}
if (Deno.build.os == "darwin" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/txthinking/ipio/releases/latest/download/ipio_darwin_amd64", "ipio");
    Deno.exit(0);
}
if (Deno.build.os == "linux" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/txthinking/ipio/releases/latest/download/ipio_linux_amd64", "ipio");
    Deno.exit(0);
}
if (Deno.build.os == "windows" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/txthinking/ipio/releases/latest/download/ipio_windows_amd64.exe", "ipio.exe");
    try{
        await Deno.remove(join(Deno.env.get("HOME"), ".nami", "bin", "wintun.dll"));
        await Deno.remove(join(Deno.env.get("HOME"), ".nami", "bin", "wintun.h"));
    }catch{}
    Deno.exit(0);
}
n.unsupport();
