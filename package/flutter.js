import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';
import {sh, home} from 'https://raw.githubusercontent.com/txthinking/denolib/master/f.js';

var n = nami("flutter");
n.open_sourced_on("https://github.com/flutter/flutter");

await sh(`git clone https://github.com/flutter/flutter.git ${home("flutter")}`);
