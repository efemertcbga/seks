const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(cclient, message, args) => {

if(message.author.id !== "822748323453992980") if(message.author.id !== "822748323453992980") return message.channel.send(" Bu komutu sadece sahiplerim kullanabilir.")

let cuser = message.mentions.users.first() || cclient.users.cache.get(args[0])
if(!cuser) return message.channel.send("Bir kullanıcı belirtmelisin!")
let csebep = args.slice(1).join(' ')
if(!csebep) return message.channel.send("Bir sebep belirtmelisin!")

message.channel.send("<:evet:840367216738041888> **"+cuser.tag+"** kullanıcısı Başarıyla kara listeden çıkarıldı.")
const westra = new Discord.MessageEmbed()
.setColor(`RED`)
.setTimestamp()
.setDescription(`<:evet:840367216738041888> **${cuser.tag}** kullanıcısı **${csebep}** sebebinden kara listeden kaldırıldı.`)
cclient.channels.cache.get("837673000828403740").send(westra)
db.delete(`ckaraliste.${cuser.id}`)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'karaliste-çıkar',
    description: 'Türkiyenin Saatini Gösterir',
    usage: 'gç'
  };
