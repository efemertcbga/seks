const Discord = require('discord.js');
module.exports.run = async(client, message, args) => {
    let sahip = "822748323453992980"
    var mesaj = args.slice(0).join('')
    if(!mesaj) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setTitle(`${client.user.username} | Bug Bildirme Sistemi`).setDescription('Bug bildirebilmem için bir şey yazmalısın dostum!').setFooter(client.user.tag))
    if(!sahip) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setTitle(`${client.user.username} | Bug Bildirme Sistemi`).setDescription('Sahibimi aradım, fakat ulaşamadım! :c').setFooter(client.user.tag))
    client.users.cache.get(sahip).send(new Discord.MessageEmbed().setColor('BLACK').setTitle(`${client.user.username} | Bug Bildirme Sistemi`).setDescription(`**Bir Mesajın Var Patron!** \n \n **Mesajı Gönderen Kişi:** \n ${message.author} \n **Mesajı Gönderen Kişi:** \n ${message.author.id} \n \n **Mesajın Gönderildiği Sunucu:** \n ${message.guild.name} \n **Mesajın Gönderildiği Sunucu:** \n ${message.guild.id} \n \n **Mesaj:** \n ${mesaj}`).setFooter(client.user.tag))
    message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setTitle(`${client.user.username} | Bug Bildirme Sistemi`).setDescription(":white_check_mark: | Bug'u başarıyla sahibime bildirdim!").setFooter(client.user.tag))
};
module.exports.conf = {aliases: [], permLevel: 0}; module.exports.help = {name: "bugbildir", description: "Toxy Bug Bildirme Sistemi", usage: "prefix+bugbildir"}