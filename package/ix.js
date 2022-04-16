import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("ix");
n.not_open_sourced_on("http://ix.io");

await n.download_command_from_url("http://ix.io/client", "ix");
