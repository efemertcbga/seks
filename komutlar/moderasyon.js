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
       .setTitle(` **ToxyBot Moderasyon Menüsüne Hoşgeldiniz** `)
        .setDescription(` ${prefix}moderasyon2 Menümüze Bakmayı Unutmayın. 
  **» ${prefix}giriş-çıkış-ayarla **  Resimli Hg-BB sistemini Açarsınız.
  **» ${prefix}giriş-çıkış-kapat **  Ayarlanan Resimli Hg-BB Sistemini Kapatırsınız.
  **» ${prefix}güvenlik **  Resimli Güvenlik Sistemini Belirlediğiniz Kanal Yapar..
  **» ${prefix}güvenlik sıfırla **   Resimli Güvenlik Sistemini Kapatırsınız.
  **» ${prefix}capslock-engelleme **   CapsLock Engelleme Sistemini Açıp Kapatırsınız (İlk Yazışta Açar 2.de kapar)
  **» ${prefix}küfürengel**  Küfür Sistemini Açar/Kapatırsınız.
  **» ${prefix}reklamengel** Reklam Engel Sistemini Açar/Kapatırsınız.
  **» ${prefix}temizle ** Belirlenen Miktarda Mesaj Siler.
  **» ${prefix}sunucupanel **   Sunucu Panel Açar.
  **» ${prefix}ban **  Etiketlenen Kullanıcıyı Banlar.
  **» ${prefix}unban ** İdsi Girelen Kullanıcıyı Banının Açar.
  **» ${prefix}nuke ** Komutun Yazıldığı Kanalı Silip Aynı İsimde Yeni Kanal Oluşturur.
  **» ${prefix}kilit ** Komutun Yazıldığı Kanalı Kilitler.
  **» ${prefix}kilit-aç ** Komutun Yazıldığı Kanalın Kilitini Açar.
  **» ${prefix}snipe ** En son silinen mesajı gösterir.

▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»  ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**
**»  ${prefix}prefix-sıfırla __Yazarak Ayarladığınız Prefixi Sıfırlayabilirsiniz.__**

`)
.addField(`» ToxyBot Bağlantıları`, ` [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=838206674400444416&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/p38dS22hRT) **|** [Sitemiz](https://www.toxybot.tk/) **|** `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Moderasyon'],
  permLevel: 0,
};

exports.help = {
  name: 'moderasyon',
  description: 'a!davet-sistemi Menüsü',
  usage: 'moderasyon'
};