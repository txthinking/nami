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
    var p = Deno.run({ cmd: ["which", "joker"], stdout: "piped" });
    var joker = new TextDecoder("utf-8").decode(await p.output());
    p.close();
    if (joker != "") {
        console.log("Check running brook via joker list");
        var p = Deno.run({
            cmd: ["sh", "-c", `joker list`],
            stdout: "piped",
        });
        var s = new TextDecoder("utf-8").decode(await p.output());
        p.close();
        var l = s.split("\n");
        var i = [];
        var c = [];
        l.forEach((v) => {
            var l1 = v.match(/\S+/g);
            if (!l1 || l1.length < 5) {
                return;
            }
            if (!l1[4].endsWith("brook")) {
                return;
            }
            console.log(
                "Backup",
                l1[0],
                "joker",
                l1
                    .slice(4)
                    .map((v) => `'${v}'`)
                    .join(" ")
            );
            i.push(l1[0]);
            c.push(
                l1
                    .slice(4)
                    .map((v) => `'${v}'`)
                    .join(" ")
            );
        });
        console.log("");
        for (var j = 0; j < i.length; j++) {
            console.log("joker stop", i[j]);
            var p = Deno.run({
                cmd: ["sh", "-c", `joker stop ${i[j]}`],
            });
            var s = await p.status();
            if (s.code != 0) {
                Deno.exit(s.code);
            }
        }
        await new Promise((r) => setTimeout(r, 3000));
    }
    await n.download_command_from_url("https://github.com/txthinking/brook/releases/latest/download/brook_linux_amd64", "brook");
    var p = Deno.run({
        cmd: ["sh", "-c", `cp '${join(Deno.env.get("HOME"), ".nami", "cache", "brook")}' '${join(Deno.env.get("HOME"), ".nami", "bin", "brook")}' && cp '${join(Deno.env.get("HOME"), ".nami", "cache", "brook")}' '${join(Deno.env.get("HOME"), ".nami", "copied", "brook")}' && chmod +x '${join(Deno.env.get("HOME"), ".nami", "bin", "brook")}'`],
    });
    var s = await p.status();
    if (s.code != 0) {
        Deno.exit(s.code);
    }
    if (joker != "") {
        console.log("");
        for (var j = 0; j < i.length; j++) {
            console.log("Restore", "joker", c[j]);
            var p = Deno.run({
                cmd: ["sh", "-c", `joker ${c[j]}`],
            });
            var s = await p.status();
            if (s.code != 0) {
                Deno.exit(s.code);
            }
        }
    }
    Deno.exit(0);
}
if (Deno.build.os == "windows" && Deno.build.arch == "x86_64") {
    await n.download_command_from_url("https://github.com/txthinking/brook/releases/latest/download/brook_windows_amd64.exe", "brook.exe");
    Deno.exit(0);
}
n.unsupport();
