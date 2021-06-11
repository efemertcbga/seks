const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
console.log(`┌─────────────────┤ ToxyBot ├─────────────────┐`)
console.log(`│ Bot Aktif!                                  │ `)
console.log(`│ Aktif Komut Sayısı: ${files.length}                     │ `)
console.log(`│ ToxyBot İsmi İle Giriş Yapıldı!             │  `)
console.log(`│ Oyun İsmi Ayarlandı!                        │ `)
console.log(`│ Site: http://www.toxybot.tk                 │ `)
console.log(`└─────────────────────────────────────────────┘`)

});
module.exports = client => {
client.user.setActivity(`${prefix}yardım | www.toxybot.tk`);
}