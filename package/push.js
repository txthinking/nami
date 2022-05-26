import nami from "https://raw.githubusercontent.com/txthinking/nami/master/nami.js";
import { join } from "https://deno.land/std@0.126.0/path/mod.ts";

var n = nami("push");
n.open_sourced_on("https://github.com/txthinking/nami");

await Deno.writeFile(`${join(Deno.env.get("HOME"), ".nami", "cache", "push")}`, new TextEncoder().encode("git add . && git commit -m null && git push origin master"));
