const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
exports.run = async(client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  let panel = await db.fetch(`sunucupanel_${message.guild.id}`)

  let rekoronline = await db.fetch(`panelrekor_${message.guild.id}`)
  if(args[0] === "sil" || args[0] === "kapat") {
    db.delete(`sunucupanel_${message.guild.id}`)
    db.delete(`panelrekor_${message.guild.id}`)
  try{
    message.guild.channels.cache.find(x =>(x .name).includes("Toplam Üye •")).delete()
    message.guild.channels.cache.find(x =>(x .name).includes("Aktif Üye •")).delete()
    message.guild.channels.cache.find(x =>(x .name).includes("Botlar •")).delete()
    message.guild.channels.cache.find(x =>(x .name).includes("Rekor Aktiflik •")).delete()
    message.guild.channels.cache.find(x =>(x .name).includes("Son Üye •")).delete()
    message.guild.channels.cache.find(x =>(x .name).includes("Çevrimiçi Üye •")).delete()
    message.guild.channels.cache.find(x =>(x .name).includes("┌─┤ Sunucu Paneli ├─┐")).delete()
    message.guild.channels.cache.find(x =>(x .name).includes("└─────────────┘")).delete()
  } catch(e) { }
    message.channel.send(`Ayarlanan sunucu paneli başarıyla devre dışı bırakıldı!`)
   return 
  }

  if(panel) return message.channel.send(`Bu sunucuda panel zaten ayarlanmış! Devredışı bırakmak için;  \`${prefix}sunucupanel sil\``)
  
      message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle('Sunucu Panel').setDescription('Gerekli dosaylar kurulsun mu?.').setFooter('Onaylıyorsan 15 saniye içerisinde "evet" yazmalısın.'))
.then(() => {
message.channel.awaitMessages(response => response.content === 'evet', {
max: 1,
time: 15000,
errors: ['time'],
}) 
.then((collected) => { 
db.set(`sunucupanel_${message.guild.id}`, message.guild.id)
  try{
    message.guild.channels.create(`┌─┤ Sunucu Paneli ├─┐`, {type: "voice"})
        message.guild.channels.create(`Toplam Üye • ${message.guild.members.cache.size}`, {type: "voice"})
  
  
        message.guild.channels.create(`Aktif Üye • ${message.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`, {type: "voice"})
        message.guild.channels.create(`Botlar • ${message.guild.members.cache.filter(m => m.user.bot).size}`, {type: "voice"})
 
  
        message.guild.channels.create(`Rekor Aktiflik • ${message.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`, {type: "voice"})
       message.guild.channels.create(`Son Üye • ${message.guild.members.cache.filter(member => member.user.username !== 'offline').size}`, {type: "voice"})
       message.guild.channels.create(`└─────────────┘`, {type: "voice"})
  db.set(`panelrekor_${message.guild.id}`, message.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
  
  message.channel.send(`Sunucu panel için gerekli kanallar oluşturulup, ayarlamalar yapıldı!  \`(Oda isimlerini değiştirmeyin, çalışmaz!)\``)
    
}catch(e){
      console.log(e.stack);
    }
  
    });
});

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sunucu-panel"],
  permLevel: 3
};

exports.help = {
  name: 'sunucupanel',
  description: 'Sunucu İstatistiklerini Gösteren Panel Kurar Ve Sürekli Olarak Günceller.',
  usage: 'sunucupanel',
  kategori: 'yetkili'
};