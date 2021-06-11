const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const Database = require("quick.db");
exports.run = async(client, message,args) => {
    if(!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    let muterol = message.guild.roles.cache.find(a => a.name == "Muted")

    if(!muterol) {
        message.reply(`<a:unlemgif:840370869578760224> Mute rolü bulunamadı! \n Bir kullanıcıyı mutelemeyi deneyin!`).then(msg => msg.delete({ timeout: 8000, reason: '.' }));
    }
let enginar = message.mentions.users.first()
if(!enginar) return message.channel.send('Lütfen unmute atılacak kişiyi etiketleyin')
    message.guild.members.cache.get(enginar.id).roles.remove(muterol);
return message.channel.send('Kişinin mute rolü kaldırıldı!')
};
exports.conf = {
enabled: true, 
guildOnly: false, 
permLevel: 0, 
aliases: []
};
exports.help = {
name: "unmute"
};