const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription(" ``Bu komutu kullanabilmek için Üyeleri Yasakla yetkisine sahip olmalısın!``")
      .setColor("BLACK");
 
    message.channel.send(embed);
    return;
  }
if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("<a:unlemgif:840370869578760224> Bu komutu kullanmak için yetkin yok!")
let user = message.mentions.users.first() || client.users.cache.get(args[0])
if (!user) return message.reply('<a:unlemgif:840370869578760224> Lütfen banlamak için bir kişi etiketleyin!');
if (user.id === message.author.id) return message.reply('Kendinimi banlayacaksın?');
let reason = args.slice(1).join(' ');
if(!reason) reason = "Belirtilmemiş"
try {
    await user.send(`<a:unlemgif:840370869578760224> ${message.guild.name} isimli sunucudan ${reason} sebebiyle yasaklandınız!`); //eğer bu satırı silerseniz banlanan kişiye mesaj göndermez
    await message.guild.members.ban(user, { reason: reason });
} catch (error) {
    return message.channel.send(`<a:unlemgif:840370869578760224> **${user.tag}** sunucudan banlanamadı! Hata: ${error}`);
}

return message.channel.send(`<a:ewd:842082023651934208> **${user.tag}** sunucudan başarıyla banlandı!`);
}
module.exports.conf = {
  aliases: [],
  permLevel: 0,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};
 
module.exports.help = {
  name: "ban",
  description: "kick",
  usage: "ban"
};