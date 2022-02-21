import ProgressBar from "https://deno.land/x/progress@v1.2.5/mod.ts";
import { red, yellow, green } from "https://deno.land/std@0.126.0/fmt/colors.ts";
import { join } from "https://deno.land/std@0.126.0/path/mod.ts";

var download = async (url, to) => {
    console.log(`Downloading file from ${url} to ${to}`);
    var r = await fetch(url);
    var p = new ProgressBar({ title: "Downloading", total: r.headers.get("content-length") });
    var l = 0;
    var reader = r.body.getReader();
    var f = await Deno.create(to);
    while (true) {
        var { done, value } = await reader.read();
        if (done) {
            break;
        }
        var n = 0;
        while (n < value.length) {
            n += await f.write(value.subarray(n));
        }
        l += value.length;
        p.render(l);
    }
    f.close();
};

var nami = (name) => {
    return {
        version: async (version) => {
            await Deno.writeFile(`${join(Deno.env.get("HOME"), ".nami", "cache", "version")}`, new TextEncoder().encode(version));
            console.log(green(`version: ${version}`));
        },
        open_sourced_on: (homepage) => {
            console.log(green(`${name} has been open sourced on ${homepage}`));
        },
        not_open_sourced_on: (homepage) => {
            console.log(yellow(`${name} has NOT been open sourced on ${homepage}. Please only run commands you believe`));
        },
        download_command_from_url: async (url, command) => {
            await download(url, `${join(Deno.env.get("HOME"), ".nami", "cache", command)}`);
        },
        // commands: {command: file_path_in_tgz}
        download_commands_from_tgz_url: async (url, commands) => {
            await download(url, `${join(Deno.env.get("HOME"), ".nami", "tmp", "_.tgz")}`);
            var p = Deno.run({
                cmd: ["sh", "-c", `rm -rf '${join(Deno.env.get("HOME"), ".nami", "tmp", "_")}' && mkdir '${join(Deno.env.get("HOME"), ".nami", "tmp", "_")}' && tar zxvf '${join(Deno.env.get("HOME"), ".nami", "tmp", "_.tgz")}' -C '${join(Deno.env.get("HOME"), ".nami", "tmp", "_")}'`],
            });
            var s = await p.status();
            if (s.code != 0) {
                Deno.exit(s.code);
            }
            p.close();
            var l = Object.keys(commands);
            for (var i = 0; i < l.length; i++) {
                var p = Deno.run({
                    cmd: ["sh", "-c", `mv '${join(Deno.env.get("HOME"), ".nami", "tmp", "_", commands[l[i]])}' '${join(Deno.env.get("HOME"), ".nami", "cache", l[i])}'`],
                });
                var s = await p.status();
                if (s.code != 0) {
                    Deno.exit(s.code);
                }
                p.close();
            }
        },
        // commands: {command: file_path_in_txz}
        download_commands_from_txz_url: async (url, commands) => {
            await download(url, `${join(Deno.env.get("HOME"), ".nami", "tmp", "_.txz")}`);
            var p = Deno.run({
                cmd: ["sh", "-c", `rm -rf '${join(Deno.env.get("HOME"), ".nami", "tmp", "_")}' && mkdir '${join(Deno.env.get("HOME"), ".nami", "tmp", "_")}' && tar Jxvf '${join(Deno.env.get("HOME"), ".nami", "tmp", "_.txz")}' -C '${join(Deno.env.get("HOME"), ".nami", "tmp", "_")}'`],
            });
            var s = await p.status();
            if (s.code != 0) {
                Deno.exit(s.code);
            }
            p.close();
            var l = Object.keys(commands);
            for (var i = 0; i < l.length; i++) {
                var p = Deno.run({
                    cmd: ["sh", "-c", `mv '${join(Deno.env.get("HOME"), ".nami", "tmp", "_", commands[l[i]])}' '${join(Deno.env.get("HOME"), ".nami", "cache", l[i])}'`],
                });
                var s = await p.status();
                if (s.code != 0) {
                    Deno.exit(s.code);
                }
                p.close();
            }
        },
        // commands: {command: file_path_in_zip}
        download_commands_from_zip_url: async (url, commands) => {
            var p = Deno.run({
                cmd: ["sh", "-c", `which unzip`],
                stdout: "null",
            });
            var s = await p.status();
            if (s.code != 0) {
                console.log(red(`Please install unzip first, such as on Ubuntu: $ sudo apt-get install unzip`));
                Deno.exit(s.code);
            }
            p.close();
            await download(url, `${join(Deno.env.get("HOME"), ".nami", "tmp", "_.zip")}`);
            var p = Deno.run({
                cmd: ["sh", "-c", `rm -rf '${join(Deno.env.get("HOME"), ".nami", "tmp", "_")}' && mkdir '${join(Deno.env.get("HOME"), ".nami", "tmp", "_")}' && unzip '${join(Deno.env.get("HOME"), ".nami", "tmp", "_.zip")}' -d '${join(Deno.env.get("HOME"), ".nami", "tmp", "_")}'`],
            });
            var s = await p.status();
            if (s.code != 0) {
                Deno.exit(s.code);
            }
            p.close();
            var l = Object.keys(commands);
            for (var i = 0; i < l.length; i++) {
                var p = Deno.run({
                    cmd: ["sh", "-c", `mv '${join(Deno.env.get("HOME"), ".nami", "tmp", "_", commands[l[i]])}' '${join(Deno.env.get("HOME"), ".nami", "cache", l[i])}'`],
                });
                var s = await p.status();
                if (s.code != 0) {
                    Deno.exit(s.code);
                }
                p.close();
            }
        },
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch: function () {
            console.log(`Fetching ${arguments[0]}`);
            return fetch.apply(null, arguments);
        },
        unsupport: () => {
            throw "Unsupport your OS or arch, you can help nami or download directly from the package homepage";
        },
    };
};

export default nami;
