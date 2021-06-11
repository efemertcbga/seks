const Discord = require('discord.js');
exports.run = function(client, message, args) {
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
    if (!user) return message.channel.send('**Çıkma Teklif Edeceğin Kişiyi Seçsene **');
    let dm = args.slice(1).join(' ');
    const dmat = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setTitle('Biri Sana Çıkma Teklifi Etti!❤️')
    .addField('Ne Cevap Vericen Acaba Bende Merak Ettim😆', `Hadi Kabul Et Bence`)
    .addField('Teklif Eden Kişi :', `➽ @${message.author.username}`)
    .setFooter('Çıkma Teklifi | Toxy')
    user.send(dmat);
    const dmtamam = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setTitle('Çıkma Teklifini DM`den Gönderdim! <a:ewed:842082023651934208>')
    .setFooter('Çıkma Teklifi | Toxy')
    message.channel.send(dmtamam);
    };
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["çteklifet",'teklifet','çte'],
  permLevel: 0
};
exports.help = {
  name: 'çıkmateklifiet',
  description: 'Özel komut.',
  usage: 'çıkmateklifiet'
};