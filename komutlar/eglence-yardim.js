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
       .setTitle(`**ToxyBot  Eğlence Menüsüne Hoşgeldiniz** `)
        .setDescription(`
 
        **»  ${prefix}çıkma-teklif-et** Etiketlediğiniz Kişiye Çıkma Teklif Edersiniz.
        **»  ${prefix}tersyazı** Yazdığınız Yazıyı Tersine Çevirir.
        **»  ${prefix}espri**  Rastgele Espri Atar.
        **»  ${prefix}elyazısı**  Yazdığınız Yazıyı El Yazısına Çevirir.
        **»  ${prefix}doğrulukcesaret**  Doğruluk Veya Cesaret Cümlesi Atar.
        **»  ${prefix}banner**  Yazdığınız YAZIYI Bannera Çevirir.
        **»  ${prefix}aşkölçer** Etiketlediğiniz Kişiyle Aranızdaki Aşkı Ölçer. (Şaka Amaçlıdır)
	      **»  ${prefix}tkm** Bot ile tkm Oynarsınız (t-k-m)
        **»  ${prefix}ys** Yıldız Savaşı Oynarsınız')
        **»  ${prefix}bg**  Bilek Güreşi Oynarsınız
        **»  ${prefix}1vs1**  Düello Oynarsınız
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
  aliases: ['eğlence'],
  permLevel: 0,
};

exports.help = {
  name: 'eğlence',
  description: 'a!davet-sistemi Menüsü',
  usage: 'eğlence'
};