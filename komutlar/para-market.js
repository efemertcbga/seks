const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {

  let x = args[0]

  let user = message.mentions.users.first() || message.author;
  let boksE = await db.fetch(`boksE_${message.author.id}`);
  let kalem = await db.fetch(`kalem_${message.author.id}`);
  let kapışC = await db.fetch(`kapışC_${message.author.id}`);
  let rozet = await db.fetch(`rozet_${message.author.id}`);
  let para = await db.fetch(`paracık_${message.author.id}`);
  let elmas = await db.fetch(`elmascıklar_${message.author.id}`);
  let altın = await db.fetch(`altıncıklar_${message.author.id}`);

  //ROZET 
  let rozetA = await db.fetch(`elmascıklar_${message.author.id}`);
  let RozetS = -50;
  let rozetF = 50;

  let prems = await db.fetch(`elmascıklar_${message.author.id}`);
  let prea = -50;
  let pref = 50;

  let prefix = await db.fetch(`prefix_${message.guild.id}`) || "*";


  try {
    
    if (!x) {
 
const e = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`<:paraROZET:840368370355929128> Rozet: **50 ELMAS** (Satın Almak İçin: ** ${prefix}market rozet**)\n:pen_ballpoint: Kalem: **250 Para** (Satın Almak İçin: ** ${prefix}market kalem**)\n<a:gold:840378330623770646> 1 Hafta Premium: **50 Elmas** (Satın Almak İçin: ** ${prefix}market premium-1hafta**)`)
message.channel.send(e)
      return
    }
    
    if (x === 'rozet') {

      if (rozet > 1) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`<:hayir:839223750457163867>Zaten sende rozet bulunuyor fazlasını ne yapacaksın?`)
    .setColor('RED')
      .setTimestamp()
      message.channel.send({embed})
    
    
  } else if (rozetA < rozetF) {
        message.channel.send(`<:hayir:839223750457163867> Rozet satın almak için yeterli elmasın bulunmuyor. \n Gerekli olan elmas: **${rozetF} ELMAS**.`)
    } else if  (rozetA > rozetF) {
message.channel.send(`<:paraROZET:840368370355929128> Rozet başarıyla aldınız!`)
db.set(`memberBadge6_${message.author.id}`, "https://cdn.discordapp.com/attachments/531535859594297364/533260601162465280/paraR.png")
db.add(`rozet_${message.author.id}`, 2)
db.add(`elmascıklar_${message.member.id}`, -50)
    
} else if  (rozetA = rozetF) {
  message.channel.send(`<:paraROZET:840368370355929128> Rozet başarıyla aldınız!`)
  db.set(`memberBadge6_${message.author.id}`, "https://cdn.discordapp.com/attachments/531535859594297364/533260601162465280/paraR.png")
  db.add(`rozet_${message.author.id}`, 2)
  db.add(`elmascıklar_${message.member.id}`, -50)
      }
      return
    }

    if (x === 'kalem') {

      if (kalem > 0) {
      const embed = new Discord.MessageEmbed()
      .setDescription(`<:hayir:839223750457163867> Zaten sende kalem bulunuyor fazlasını ne yapacaksın?`)
      .setColor('RED')
      .setTimestamp()
      message.channel.send({embed})
    
    
  } else if (para < 200) {
        message.channel.send(`<:hayir:839223750457163867> Kalem satın almak için yeterli paran bulunmuyor. \n Gerekli olan para: **250 Para**.`)
    } else if  (para > 200) {
message.channel.send(`<:evet:840367216738041888> Kalem başarıyla aldınız!`)
db.add(`kalem_${message.author.id}`, 2)
db.add(`paracık_${message.member.id}`, -200)

  } else if  (para = 200) {
    message.channel.send(`<:evet:840367216738041888> Kalem başarıyla aldınız!`)
    db.add(`kalem_${message.author.id}`, 2)
    db.add(`paracık_${message.member.id}`, -200)
        }
      return
    }

    if (x === 'premium-1hafta') {
    } else if (prems < pref) {
      message.channel.send(`<:hayir:839223750457163867> Premium satın almak için yeterli elmasın bulunmuyor. \n Gerekli olan elmas: **${pref} ELMAS**.`)
  } else if  (prems > pref) {
message.channel.send(`<:paraROZET:840368370355929128> Premium başarıyla aldınız!\n Premiumu almak için [Destek Sunucuma](https://discord.gg/p38dS22hRT) Gelin!`)
db.add(`elmascıklar_${message.member.id}`, -50)
  
} else if  (prems = pref) {
  message.channel.send(`<:paraROZET:840368370355929128> Premium başarıyla aldınız!\n Premiumu almak için [Destek Sunucuma](https://discord.gg/p38dS22hRT) Gelin!`)
db.add(`elmascıklar_${message.member.id}`, -50)
    }
    return
  
    } catch(err) {
      
    }

    
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "profil"
};

exports.help = {
  name: 'market',
  description: 'eşya satın alabilirsiniz gösterir.',
  usage: 'market'
};