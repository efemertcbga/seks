const discord = require('discord.js')
const db = require('quick.db')
exports.run = async(client, message, args) => { 
    let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "*";

  if (args.length < 1) {
    return message.reply(`Doğru Kullanım ${prefix}tersyazı merhaba`)
  }
   
message.channel.send(args.join(' ').split('').reverse().join(''))
};

exports.conf = {
  aliases: [ 'ters' ],
  enabled: true,
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'tersyazı',
  description: 'Gönderdiğiniz mesajın ters çevrilmiş halini yazar.',
  category: 'Kullanıcı',
  usage: 'tersyaz yazı',
};