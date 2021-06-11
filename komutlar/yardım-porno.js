const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('838206674400444416') 
 
exports.run = async(client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "*";

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(` **ToxyBot NSFW Menüsüne Hoşgeldiniz** `)
        .setDescription(`
  **» ${prefix}4k**  4k resim atar.		
  **» ${prefix}pussy**  Am resmi atar.
  **» ${prefix}pgif** Gif atar.
  **» ${prefix}ass**   Göt resmi atar.
  **» ${prefix}anal** Götten resim atar.
  **» ${prefix}boobs ** Meme resmi atar.

▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»  ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**
**»  ${prefix}prefix-sıfırla __Yazarak Ayarladığınız Prefixi Sıfırlayabilirsiniz.__**

`)
.addField(`» ToxyBot Bağlantıları`, ` [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=838206674400444416&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/p38dS22hRT) **|** [Sitemiz](https://www.toxybot.tk/) **|** `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['nsfw', 'porno'],
  permLevel: 0,
};

exports.help = {
  name: 'nsfw',
  description: 'Yardım Menüsü',
  usage: 'yardım'
};