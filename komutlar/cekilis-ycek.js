const ms = require('ms');
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Çekiliş")){
    return message.channel.send(':x: Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmanız veya __Çekiliş__ adında bir role sahip olmanız gerek..');
    return;
  }

let messageID = args[0]
    if(!messageID){
        return message.channel.send(':x: bir çekiliş ID si **belirtmelisin!**');
    }
client.giveawaysManager.reroll(messageID, {
    messages: {
        congrat: ":tada: Yeni kazanan(lar): {winners}! Tebrikler!",
        error: "Geçerli katılım yok, kazanan seçilemez!"
                    }   
}).catch((err) => {
    message.channel.send("`"+ messageID +"` için çekiliş bulamadım, lütfen kontrol edin ve tekrar deneyin");
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['çekiliş-reroll'],
  permLevel: 0
};

exports.help = {
  name: 'çekiliş-yeniden',
  description: 'çekiliş',
  usage: 'çekiliş-tekrar'
};