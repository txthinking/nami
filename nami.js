import ProgressBar from "https://raw.githubusercontent.com/txthinking/progress/nami1.2.3/mod.ts";
import { red, yellow, green } from "https://raw.githubusercontent.com/denoland/deno_std/0.118.0/fmt/colors.ts";

var download = async (url, to) => {
    console.log(`Downloading file from ${url} to ${to}`);
    var r = await fetch(url);
    var p = new ProgressBar({title: 'Downloading', total: r.headers.get('content-length')});
    var l = 0;
    var reader = r.body.getReader();
    var f = await Deno.create(to);
    while(true) {
        var {done, value} = await reader.read();
        if (done) {
            break;
        }
        await f.write(value);
        l += value.length;
        p.render(l);
    }
    f.close();
};

var nami = (name) => {
    return {
        version: async (version)=>{
            await Deno.writeFile(`${Deno.env.get("HOME")}/.nami/cache/version`, new TextEncoder().encode(version));
            console.log(green(`Found version: ${version}`))
        },
        open_sourced_on: (homepage)=>{
            console.log(green(`${name} has been open sourced on ${homepage}`))
        },
        not_open_sourced_on: (homepage)=>{
            console.log(yellow(`${name} has NOT been open sourced on ${homepage}. Please only run commands you believe`))
        },
        download_command_from_url: async (url, command) => {
            await download(url, `${Deno.env.get("HOME")}/.nami/cache/${command}`);
        },
        // commands: {command: file_path_in_tgz}
        download_commands_from_tgz_url: async (url, commands) => {
            await download(url, `/tmp/_.tgz`);
            var p = Deno.run({
                cmd: ["sh", "-c", `rm -rf /tmp/_ && mkdir /tmp/_ && tar zxvf /tmp/_.tgz -C /tmp/_`],
            });
            var s = await p.status();
            if(s.code != 0){
                Deno.exit(s.code);
            }
            p.close();
            var l = Object.keys(commands);
            for(var i=0; i<l.length; i++){
                var p = Deno.run({
                    cmd: ["sh", "-c", `mv '/tmp/_/${commands[l[i]]}' '${Deno.env.get("HOME")}/.nami/cache/${l[i]}'`],
                });
                var s = await p.status();
                if(s.code != 0){
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
            if(s.code != 0){
                console.log(red(`Please install unzip first, such as on Ubuntu: $ sudo apt-get install unzip`))
                Deno.exit(s.code);
            }
            p.close();
            await download(url, `/tmp/_.zip`);
            var p = Deno.run({
                cmd: ["sh", "-c", `rm -rf /tmp/_ && mkdir /tmp/_ && unzip /tmp/_.zip -d /tmp/_`],
            });
            var s = await p.status();
            if(s.code != 0){
                Deno.exit(s.code);
            }
            p.close();
            var l = Object.keys(commands);
            for(var i=0; i<l.length; i++){
                var p = Deno.run({
                    cmd: ["sh", "-c", `mv '/tmp/_/${commands[l[i]]}' '${Deno.env.get("HOME")}/.nami/cache/${l[i]}'`],
                });
                var s = await p.status();
                if(s.code != 0){
                    Deno.exit(s.code);
                }
                p.close();
            }
        },
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch: function(){
            console.log(`Fetching ${arguments[0]}`)
            return fetch.apply(null, arguments);
        },
        unsupport: ()=>{
            throw 'Unsupport your OS or arch, you can help nami or download directly from the package homepage';
        },
    };
};

export default nami;
