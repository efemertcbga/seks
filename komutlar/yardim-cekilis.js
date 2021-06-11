const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('811238807692771348') 
 
exports.run = async(client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "*";

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(` **ToxyBot Çekiliş Menüsüne Hoşgeldiniz** `)
        .setDescription(`
  **» ${prefix}çekiliş-yap [Süre] [Kazanacak_Kişi_Sayısı] [Ödül]**  Çekiliş Yaparsınız.
  **» ${prefix}çekiliş-yeniden [Mesaj_ID]**  Çekilişi yendien çekersiniz.
  **» ${prefix}çekiliş-bitir [Mesaj_ID]** Çekilişi bitirirsiniz.		
  **» ${prefix}çekiliş-liste** Sunucudaki aktif çekilişleri gösterir.



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
  aliases: ['çekiliş-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'çekiliş-yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'çekiliş-yardım'
};