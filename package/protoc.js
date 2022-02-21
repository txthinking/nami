import nami from "https://raw.githubusercontent.com/txthinking/nami/master/nami.js";
import { join } from "https://deno.land/std@0.126.0/path/mod.ts";

var n = nami("protoc");
n.open_sourced_on("https://github.com/protocolbuffers/protobuf");

var r = await n.fetch("https://api.github.com/repos/protocolbuffers/protobuf/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if (Deno.build.os == "darwin" && Deno.build.arch == "x86_64") {
    await n.download_commands_from_zip_url(`https://github.com/protocolbuffers/protobuf/releases/latest/download/protoc-${j.tag_name.replace("v", "")}-osx-x86_64.zip`, {
        protoc: join("bin", "protoc"),
    });
    Deno.exit(0);
}
if (Deno.build.os == "linux" && Deno.build.arch == "x86_64") {
    await n.download_commands_from_zip_url(`https://github.com/protocolbuffers/protobuf/releases/latest/download/protoc-${j.tag_name.replace("v", "")}-linux-x86_64.zip`, {
        protoc: join("bin", "protoc"),
    });
    Deno.exit(0);
}
if (Deno.build.os == "windows" && Deno.build.arch == "x86_64") {
    await n.download_commands_from_zip_url(`https://github.com/protocolbuffers/protobuf/releases/latest/download/protoc-${j.tag_name.replace("v", "")}-win64.zip`, {
        protoc: join("bin", "protoc.exe"),
    });
    Deno.exit(0);
}
n.unsupport();
