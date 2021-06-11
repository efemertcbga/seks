const Discord = require("discord.js");
const moment = require('moment');

module.exports.run = async (client, message, args) => {
  const ok = message.client.emojis.cache.get("840378330623770646");
           var doktor = new Discord.MessageEmbed()
                .setAuthor('#' + message.channel.name, message.guild.iconURL)
                .addField(" ID", message.channel.id)
                if (message.channel.nsfw) {
                    doktor.addField(" Uygunsuz İçerik", "Evet", true)
                }
                else {
                    doktor.addField(" Uygunsuz İçerik", "Hayır", true)
                }
                doktor.addField('Oluşturulduğu Tarih:', moment(message.channel.createdAt).format('DD/MM/YYYY'), true)
                .setColor(3447003)
                .setThumbnail(message.guild.iconURL)
                .setFooter('ToxyBot Kanal Bilgi', client.user.avatarURL)
            message.channel.send(doktor)
            message.react(ok)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kanal bilgi'],
  permLevel: 0
};

exports.help = {
  name: 'kanalbilgi',
  description: 'Kanal ile ilgili bilgi verir.',
  usage: 'kanalbilgi'
}