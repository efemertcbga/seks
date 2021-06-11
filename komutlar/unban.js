const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

 
let unbanid = args[0]
if(!unbanid) return message.reply("Banını kaldırmak istediğin kişinin id sini yazmalısın.")

  
message.guild.members.unban(unbanid)
message.channel.send(`<@${unbanid}>, Adlı Kullanıcının Banı Kaldırıldı.`).then(msg => msg.delete(5000))

const unban = new Discord.MessageEmbed()
.setColor('BLACK')
.setThumbnail(message.author.avatarURL())  
.setDescription(`• Banı Kaldıran Yetkili: `+ message.member +`\n• Banı Kaldırılan Kullanıcı : <@${unbanid}> \n• Ban kaldırılma Sebebi: Girilmemiş`)
.setTimestamp()
.setImage('https://cdn.discordapp.com/attachments/839886728092844083/843246719742771200/ezgif.com-gif-maker.gif')
message.channel.send(unban)

  

};
exports.conf = {
enabled:true,
guildOnly: true,
aliases: ["unban"],
permlevel: 2
};
exports.help = {
name: "unban",
description: "Herhangi bir kullanıcının banını açarsınız.",
usage: "unban kullanıcı"
};