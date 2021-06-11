const Discord = require('discord.js');

exports.run = (client, message, args) => {
            message.channel.clone().then(knl => {
              let position = message.channel.position;
              knl.setPosition(position);
              const embd = new Discord.MessageEmbed()
              .setTitle(`Nuke!`)
              .setDescription(`Bu kanal ${message.author.username} tarafından havaya uçuruldu!`)
              .setImage(`https://media.tenor.com/images/183a895723f5d4862a0eb7a18acd36ec/tenor.gif`)
              knl.send(embd);
              message.channel.delete();
            })
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3 //Perm leveli istediğiniz gibi değiştirebilirsiniz.
};

exports.help = {
    name: 'nuke',
    description: 'Kanalı siler ve aynı kategoriye yenisini açar ve kanalın içindeki tüm mesajlar gider.',
    usage: 'nuke'
};