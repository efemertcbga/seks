const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (kontrol == "yokagayok") {

        if (!prefix) {
          const embed = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription(`Prefix zaten ayarlanmamış!`)
            .setFooter(client.user.username, client.user.avatarURL());

          message.channel.send(embed);
          return;
        }
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`Prefix başarıyla sıfırlandı!`)
          .setFooter(client.user.username, client.user.avatarURL());

        message.channel.send(embed);
        db.delete(`prefix_${message.guild.id}`);
      
  } else {
    
        if (!prefix) {
          const embed = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription(`Prefix Zaten Ayarlanmamış!`)
            .setFooter(client.user.username, client.user.avatarURL());

          message.channel.send(embed);
          return;
        }
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`Prefix Başarıyla Sıfırlandı!`)
          .setFooter(client.user.username, client.user.avatarURL());

        message.channel.send(embed);
        db.delete(`prefix_${message.guild.id}`);
      
  }
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["prefix-reset"],
  permLevel: 3
};

module.exports.help = {
  name: "prefix-sıfırla",
  description: "prefix-sıfırla",
  usage: "prefix-sıfırla"
};
