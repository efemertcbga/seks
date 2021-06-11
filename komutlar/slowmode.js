const Discord = require('discord.js');
const request = require('request')
const fynx =require("../ayarlar.json");
const db = require("quick.db");
exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`  **Bu komutu kullanabilmek için "\`Kanalları Yönet\`" yetkisine sahip olmalısın.**`);

  let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
if (message.channel.type !== "text") return;
const limit = args[0] ? args[0] : 0;
  if(!limit) {
              var embed = new Discord.MessageEmbed()
                .setTitle('HATA:')
                .setDescription(`**Doğru kullanım:**   \`${prefix}yavaşmod [0/120]\``)
                .setColor("#ffd100")
            message.channel.send({embed})
            return
          }
if (limit > 120) {
    return message.channel.send(new Discord.MessageEmbed().setDescription("**Süre limiti maksimum** **120** **saniye olabilir.**").setColor("#ffd100"));
}
   message.channel.send(new Discord.MessageEmbed().setDescription(` Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır!`).setColor("#ffd100"));
message.channel.setRateLimitPerUser(limit)
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['ymod'],
 permLevel: 3
};

exports.help = {
 name: 'yavaşmod',
 description: '',
 usage: ''
};