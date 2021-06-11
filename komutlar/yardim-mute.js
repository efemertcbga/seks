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
       .setTitle(` **ToxyBot Mute Menüsüne Hoşgeldiniz** `)
        .setDescription(`
  **» ${prefix}mute-ayarla log #kanal**  Mute Sisteminin Logunu Ayarlarsınız.
  **» ${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g> <sebep>**    Mute Atarsınız.
  **» ${prefix}unmute** Etiketlediğiniz Kişinin Mutesini Kaldırırsınız.		



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
  aliases: ['mute-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'mute-yardım',
  description: 'toxybot',
  usage: 'mute-yardım'
};