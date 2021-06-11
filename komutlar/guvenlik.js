const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async (bot, message,args) => {
    let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "*";  
  
  
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

let logk = message.mentions.channels.first();  
  
let logkanal = await db.fetch(`guvenlik${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {   
    if(!logkanal) return message.channel.send(`Güvenliği kapatmak için \`güvenlik kanalının\` seçili olması lazım örnek kullanım: \`${prefix}güvenlik #kanal\``);
    
   db.delete(`guvenlik${message.guild.id}`)  
    
   message.channel.send(`Güvenlik başarıyla kapatıldı.`);   
    
  
    return
  }  
  
if (!logk) return message.channel.send(`Güvenlik kanalını bulamadım  Kullanım \`${prefix}güvenlik #kanal\``);  
 

   db.set(`guvenlik${message.guild.id}`, logk.id)

message.channel.send(`Güvenlik başarıyla ${logk} olarak ayarlandı`);  

}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gks','güvenlik'],
  permLevel: 4
};

module.exports.help = {
  name: 'güvenlik',
  description: 'güvenlik sağlar',
  usage: 'güvenlik'
};
   