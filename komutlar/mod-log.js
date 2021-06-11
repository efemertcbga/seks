const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');


exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "*";

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`log_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.send(` Modlog Kanalı Zaten ayarlı değil.`);
    db.delete(`log_${message.guild.id}`)
   message.channel.send(` ModLog Kanalı başarıyla sıfırlandı.`);
    return
  }
  //Darkcode
if (!logk) return message.channel.send(` Yanlış Kullanım Doğru Kullanım: ${prefix}mod-log #kanal`);

db.set(`log_${message.guild.id}`, logk.id)

message.channel.send(` Mod-Log kanalı başarıyla ${logk} olarak ayarlandı.`);
 message.react('838540189454303343')

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log','modlog','log-ayarlama','logayarla','log','vkanal','kayıtkanalı','d'],
    permLevel: 3
};

exports.help = {
    name: 'mod-log',
    description: 'Mod-Log kanalını belirler.',
    usage: 'mod-log <#kanal>'
};