import nami from "https://raw.githubusercontent.com/txthinking/nami/master/nami.js";
import { join } from "https://deno.land/std@0.126.0/path/mod.ts";

var n = nami("jq");
n.open_sourced_on("https://github.com/stedolan/jq");

var r = await n.fetch("https://api.github.com/repos/stedolan/jq/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if (Deno.build.os == "darwin" && Deno.build.arch == "aarch64") {
    await n.download_commands_from_tgz_url("https://mirrors.ustc.edu.cn/homebrew-bottles/jq-1.6.arm64_monterey.bottle.1.tar.gz", {
        jq: join("jq", "1.6", "bin", "jq"),
    });
    Deno.exit(0);
}
if (Deno.build.os == "darwin" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/stedolan/jq/releases/latest/download/jq-osx-amd64", "jq");
    Deno.exit(0);
}
if (Deno.build.os == "linux" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/stedolan/jq/releases/latest/download/jq-linux64", "jq");
    Deno.exit(0);
}
if (Deno.build.os == "windows" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/stedolan/jq/releases/latest/download/jq-win64", "jq.exe");
    Deno.exit(0);
}
n.unsupport();
