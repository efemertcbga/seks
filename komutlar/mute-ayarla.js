const discord = require('discord.js');
const db = require("quick.db");
exports.run = async(client, message, args) => {

if(args[0] == "log") {
let enginarr = message.mentions.channels.first()
if(!enginarr) return message.channel.send('Lütfen mute log kanalını belirtin!')
db.set(`mutelog_${message.guild.id}`, enginarr.id)
return message.channel.send(`Mute log kanalı <#${enginarr.id}> olarak ayarlandı!`)
}

}
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    permLevel: 0, 
    aliases: []
    };
    exports.help = {
    name: "mute-ayarla"
    };