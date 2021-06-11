const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => { 
const fynx = require("../ayarlar.json");
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix   
let sayı = args.slice(0).join(" ");
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`  **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
 
 if(!sayı) return message.channel.send(` **Lütfen Gönderilecek Mesajı Belirt!** \n**__Örnek Kullanım__** : \`${prefix}sayaç-çıkan-mesaj -uye- , Sunucudan ayrıldı. -uyesayisi- Kişi kaldık. Sayaç hedefinin tamamlanmasına -kalanuye- kişi kaldı! \``)

 
  message.channel.send(`Mesajı **${sayı}** Olarak Güncelledim! `)

 
  db.set(`sayac_${message.guild.id}`, args.slice(0).join(" ")) 
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: ['sayaç-çıkan-mesaj']
  };
  
  exports.help = {
    name: 'sayaç-çıkan-mesaj',
    description: 'Türkiyenin Saatini Gösterir',
    usage: 'ayaç-çıkan-mesaj'
  };