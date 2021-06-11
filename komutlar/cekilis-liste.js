const Discord = require('discord.js');
const ms = require('ms');
module.exports.run = async (bot, message, args) => {
    let activeGiveaways = bot.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id);
    let giveaways = activeGiveaways.filter((g) => !g.ended);
if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Çekiliş")){
    return message.channel.send(':x: Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmanız veya __Çekiliş__ adında bir role sahip olmanız gerek..');
    return;
  }
    if (giveaways.length === 0) {
      message.channel.send(':x: Bu sunucuda şu anda etkin bir çekiliş yok.');
      return;
    }

  const embed = new Discord.MessageEmbed()
  .setTitle("" + message.guild.name + " | Çekiliş Listesi")
  .setDescription(`${giveaways.map((g) => `**Ödül**: ${g.data.prize}
**Kazanan(lar)**: ${g.data.winnerCount}
**ID**: ${g.messageID}
**Kanal**: <#${g.channelID}>`).join("\n\n")}`)
  .setFooter(bot.user.username, bot.user.avatarURL());
 return message.channel.send(embed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'çekiliş-liste',
  description: 'çekiliş',
  usage: 'çekiliş-liste'
};