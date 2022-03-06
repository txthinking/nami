import nami from "https://raw.githubusercontent.com/txthinking/nami/master/nami.js";
import { join } from "https://deno.land/std@0.126.0/path/mod.ts";

var n = nami("brook");
n.open_sourced_on("https://github.com/txthinking/brook");

var r = await n.fetch("https://api.github.com/repos/txthinking/brook/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if (Deno.build.os == "darwin" && Deno.build.arch == "aarch64") {
    await n.download_command_from_url("https://github.com/txthinking/brook/releases/latest/download/brook_darwin_arm64", "brook");
    Deno.exit(0);
}
if (Deno.build.os == "darwin" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/txthinking/brook/releases/latest/download/brook_darwin_amd64", "brook");
    Deno.exit(0);
}
if (Deno.build.os == "linux" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/txthinking/brook/releases/latest/download/brook_linux_amd64", "brook");
    Deno.exit(0);
}
if (Deno.build.os == "windows" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/txthinking/brook/releases/latest/download/brook_windows_amd64.exe", "brook.exe");
    Deno.exit(0);
}
n.unsupport();
