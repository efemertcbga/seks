const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const talkedRecently = new Set();
let botid = ('811238807692771348') 
exports.run = async(client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "*";  
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`**ToxyBot Moderasyon Menüsüne Hoşgeldiniz** `)
        .setDescription(`
  **» ${prefix}mod-log**  Mod-Log Kanalını Belirlersiniz.
  **» ${prefix}mod-log kapat**  Ayarlanan Mod-Log Kanalı Kapatılır.
  **» ${prefix}oylama **  Oylama Yaparsınız
  **» ${prefix}yasaklı-tag **  Yasaklı Tag Ayarlar.
  **» ${prefix}otorol-ayarla**  Otorol Ayarlar.
  **» ${prefix}otorol-mesaj** Otorol Mesajı Ayarlar.
  **» ${prefix}otorol-sıfırla**  Otorol Sıfırlar.
  **» ${prefix}sayaç-ayarla**   Sayaç Ayarlar.
  **» ${prefix}sayaç-sıfırla**   Sayaç Sıfırla.
  **» ${prefix}sayaç-mesaj**   Sayaç Giriş Mesajını Ayarlar.
  **» ${prefix}sayaç-çıkan-mesaj**   Sayaç Çıkan Mesajını Ayarlar.
  **» ${prefix}kick ** Etiketlenen Kullanıcıyı Kickler.
  **» ${prefix}sa-as aç **   SA-AS Sistemini Açar.
  **» ${prefix}sa-as kapat **  SA-AS Sistemini Kapatır.
  **» ${prefix}emoji-ekle **  Emoji Ekler.
  **» ${prefix}ban-say **Banlı Üye Sayısını Öğrenirsiniz.

▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»  ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**
**»  ${prefix}prefix-sıfırla __Yazarak Ayarladığınız Prefixi Sıfırlayabilirsiniz.__**

`)
.addField(`» ToxyBot Bağlantıları`, ` [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=838206674400444416&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/p38dS22hRT) **|** [Sitemiz](https://www.toxybot.tk/) **|** `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Moderasyon2'],
  permLevel: 0,
};

exports.help = {
  name: 'moderasyon2',
  description: 'a!davet-sistemi Menüsü',
  usage: 'moderasyon'
};