const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ms = require('ms');
const moment = require('moment');
exports.run = async (client, message, args) => {
  
//-------------------------------------------------------------------------------\\

if(!message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
let log = message.guild.channels.cache.get(await data.fetch(`mutelog_${message.guild.id}`));    
let muterol = message.guild.roles.cache.find(a => a.name == "Muted")

if(!muterol) {
    
  message.guild.roles.create({
data: {
  name: 'Muted',
  color: 'GRAY',
}
}).then(b => {
   message.guild.channels.cache.forEach(a => {
a.createOverwrite(message.guild.roles.cache.find(a => a.id === b.id), {
SEND_MESSAGES: false,
READ_MESSAGE_HISTORY: true,
MENTION_EVERYONE: false,
ADD_REACTIONS: false
})
})
message.channel.send(`\`${b.name}\` İsimli Rol Oluşturuldu ve Mute Rolü olarak ayarlandı lütfen ismini değiştirmeyin.\n NOT: ${b.name} Rolünü Üye Rolünün Üstüne Almanız Önerilir!\n Komutu tekrar kullanın!`)
})
return
}

//-------------------------------------------------------------------------------\\

let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!member) return message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`${message.author}, lütfen bir kullanıcı etiketle !`))
          
let mute = message.mentions.members.first() || message.guild.members.cache.find(r => r.id === args[0]);
if (!mute) { new MessageEmbed().setColor('0x800d0d').setDescription(`${message.author}, lütfen mute atmam gereken kullanıcı belirt !`);
} else {
if (mute.roles.highest.position >= message.member.roles.highest.position) 
              {
return message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`));
} else {
let zaman = args[1]   
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
if (!zaman) { message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`Lütfen Bir zaman dilimi belirtin.`));
} else {
let sebep = args[2]
if(!sebep) return message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`Lütfen Bir sebep belirtiniz.`))  
                
let zamandilimi = zaman
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");
                  
let tumaylar = {
"01": "Ocak",  
"02": "Şubat", 
"03": "Mart",  
"04": "Nisan",  
"05": "Mayıs", 
"06": "Haziran", 
"07": "Temmuz",
"08": "Ağustos", 
"09": "Eylül", 
"10": "Ekim", 
"11": "Kasım", 
"12": "Aralık", 
}
let aylar = tumaylar; 
               {
let muteler = jdb.get(`tempmute`) || [];
if (!muteler.some(j => j.id == member.id)) {
kdb.add(`kullanici.${message.author.id}.mute`, 1);
data.add('case', 1)
const numara = await data.fetch('case')
moment.locale("tr");
kdb.push(`kullanici.${member.id}.sicil`, {
Yetkili: message.author.id,
Sebep: sebep,
Ceza: "MUTE",
Süre: zamandilimi,
cezano: numara,
Tarih: (`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
});
};
                 
data.set(`muteli_${member.guild.id + member.id}`, 'muteli')
data.set(`süre_${member.id + member.guild.id}`, zamandilimi)
let log = message.guild.channels.cache.get(await data.fetch(`mutelog_${message.guild.id}`));  
                 
message.react('<a:ewed:842082023651934208>')          
message.channel.send(`<a:ewed:842082023651934208> Kişi Başarıyla Mutelendi! ${log} Kanalına Logu gönderdim!`)
log.send(
new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
.setColor('ffdb55')
.setDescription(`
**Metin Kanallarında Susturuldu !**
**Kullanıcı:** <@${member.id}> (\`${member.id}\`)
**Yetkili:** <@${message.author.id}> (\`${message.author.id}\`)
**Süre:** \`${zamandilimi}\`
**Tarih:** (\`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\`)
        
`))
mute.roles.add(muterol)
message.react('<a:ewed:842082023651934208>')
}
let slog = message.guild.channels.cache.get(await data.fetch(`mutelog_${message.guild.id}`));   
setTimeout(async function() {
mute.roles.remove(muterol)
slog.send(
new MessageEmbed()
.setColor('#494459')
.setTimestamp()
.setDescription(`
**Metin Kanallarında Susturulması Bitti !**
**Kullanıcı:** <@${member.id}> (\`${member.id}\`)
**Süre:** \`${zamandilimi}\`
**Tarih:** (\`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).add(10,"hours").format("YYYY HH:mm:ss")}\`)`)
);
}, ms(zaman));
        
}}}
 
  
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["mute"],
    permLevel: 0,
    name: "mute"
  }
  
  exports.help = {
    name: "mute"
  };