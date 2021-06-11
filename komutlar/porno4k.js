const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const db = require("quick.db")
const nsfw = new NSFW();
exports.run = async (client, message, args) => { 
   if (message.channel.nsfw){
const image = await nsfw.fourk();
const embed = new Discord.MessageEmbed()
    .setTitle(`4K Porno Sikiş İzle HD izle`)
    .setColor("GREEN")
    .setImage(image);
message.channel.send(embed);}
 else{
    message.channel.send("Bu kanal bir nsfw kanalı değil")
  }}

    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['4k'],
    permLevel: 0,
}
exports.help = {
    name: '4ke',
    description: 'sikiş izle 4k izle porno izle.',
    usage: '4k',
}  