const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const db = require("quick.db")
const nsfw = new NSFW();
exports.run = async (client, message, args) => { 
   if (message.channel.nsfw){
const image = await nsfw.ass();
const embed = new Discord.MessageEmbed()
    .setTitle(`Ass Porno Sikiş İzle HD izle`)
    .setColor("GREEN")
    .setImage(image);
message.channel.send(embed);}
 else{
    message.channel.send("Bu kanal bir nsfw kanalı değil")
  }}

    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ass'],
    permLevel: 0,
}
exports.help = {
    name: 'popo',
    description: 'premium verirsiniz.',
    usage: 'premiumver',
}  