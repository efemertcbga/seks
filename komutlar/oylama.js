const Discord = require('discord.js');
const client = new Discord.Client();
 exports.run = (client, message, args) => {
   message.delete();
   let question = args.join(' ');
   let user = message.author.username
   if (!question) return message.channel.send(
     new Discord.MessageEmbed()
     .setDescription(`**Yazı Yazman Gerek** `)).then(m => m.delete(5000));
     console.log("oylama komutu " + message.author.username + '#' + message.author.discriminator + " tarafından kullanıldı.")
     message.channel.send(
       new Discord.MessageEmbed()
       .setColor("RED")
       .setThumbnail(client.user.displayAvatarURL())
       .setTimestamp()
       .setFooter('ToxyBot Oylama Sistemi', client.user.displayAvatarURL())
       .addField(`**Oylama**`, `**${question}**`)).then(function(message) {
         message.react('✅');
         message.react('❌');
       });
 }
     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['oylama'],
  permLevel: 2
};
exports.help = {
  name: 'oylama',
  description: 'Oylama yapmanızı sağlar.',
  usage: 'oylama <oylamaismi>'
};