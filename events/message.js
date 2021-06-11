const ayarlar = require('../ayarlar.json');
const Discord = require("discord.js");
const db = require("quick.db");
let talkedRecently = new Set();
module.exports = async message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, );

  let client = message.client;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);

  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
	//
	 let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor(`RED`)
 .setDescription(`<:hayir:839223750457163867> **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [BURAYA](https://discord.gg/p38dS22hRT) gelebilirsin!`)
  if(karaliste) return message.channel.send(westraben)
	//
    cmd.run(client, message, params, perms);
const embed = new Discord.MessageEmbed()
    .setTitle(`Bir Komut kullanıldı.`)
    .setDescription(`
    > Komutu kullanan kişi: **${message.author.tag}**
    > Kullanılan Komut: **${message.content}** 
    > Kullanılan Sunucu: **${message.guild.name}**`)
    .setColor("YELLOW")
    client.channels.cache.get("842070623077138432").send(embed)
  }
};


