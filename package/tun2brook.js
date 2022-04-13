import nami from "https://raw.githubusercontent.com/txthinking/nami/master/nami.js";
import { join } from "https://deno.land/std@0.126.0/path/mod.ts";

var n = nami("tun2brook");
n.not_open_sourced_on("https://github.com/txthinking/tun2brook");

var r = await n.fetch("https://api.github.com/repos/txthinking/tun2brook/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if (Deno.build.os == "darwin" && Deno.build.arch == "aarch64") {
    await n.download_command_from_url("https://github.com/txthinking/ipio/releases/latest/download/tun2brook_darwin_arm64", "tun2brook");
    Deno.exit(0);
}
if (Deno.build.os == "darwin" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/txthinking/ipio/releases/latest/download/tun2brook_darwin_amd64", "tun2brook");
    Deno.exit(0);
}
if (Deno.build.os == "linux" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/txthinking/ipio/releases/latest/download/tun2brook_linux_amd64", "tun2brook");
    Deno.exit(0);
}
if (Deno.build.os == "windows" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/txthinking/ipio/releases/latest/download/tun2brook_windows_amd64.exe", "tun2brook.exe");
    try{
        await Deno.remove(join(Deno.env.get("HOME"), ".nami", "bin", "wintun.dll"));
        await Deno.remove(join(Deno.env.get("HOME"), ".nami", "bin", "wintun.h"));
    }catch{}
    Deno.exit(0);
}
n.unsupport();
