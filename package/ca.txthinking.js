import nami from "https://raw.githubusercontent.com/txthinking/nami/master/nami.js";
import {sh, s2b, home, echo} from 'https://raw.githubusercontent.com/txthinking/denolib/master/f.js';

var n = nami("ca.txthinking");
n.open_sourced_on("https://github.com/txthinking/ca");

await n.download_command_from_url("https://txthinking.github.io/ca/ca.pem", "ca.pem");
