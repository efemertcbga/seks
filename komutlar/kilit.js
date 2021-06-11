const Discord = require('discord.js');
 
exports.run = (client, message, args) => {
if(!message.member.hasPermission('MANAGE_CHANNELS')) return;

let channel = message.mentions.channels.first() || message.channel;

let reason;
if(!message.mentions.channels.first()) {
if(args[0]) reason = args.slice(0).join(' ');
};
if(message.mentions.channels.first()) {
if(args[1]) reason = args.slice(1).join(' ');
};

let reasonn;
if(!reason) reasonn = '. Sebep Girilmedi.';
if(reason) reasonn = `${reason}`;
message.channel.send(`Kanal ${channel} Kilitlendi.`).then(m => m.delete({timeout: 7000}));

let everyone = message.guild.roles.cache.find(a => a.name === '@everyone');
channel.updateOverwrite(everyone, { 'SEND_MESSAGES': false }, 'Tarafından Kilitlendi '+message.author.tag);
channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setTitle(channel.name+' Kilitlendi.')
.setDescription(`Şu anda, Yetkililer Bu kanalı ${reasonn} yüzünden kilitledi. Lütfen bu karara saygı gösterin.`));

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["lock"],
  permLevel: 0
};
 
exports.help = {
  name: 'kilit'
};