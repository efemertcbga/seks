const Discord = require('discord.js');
const client = new Discord.Client()
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Selam!\n **Toxy** Botu Ekleyerek Bize Destek Sağlayabilirsiniz.\nBotu Eklemek İçin [BURAYA](https://discord.com/oauth2/authorize?client_id=838206674400444416&scope=bot&permissions=8) Tıkla!`)
exports.run = async (westraclient, message, args) => {
	message.channel.send(embed)
};
exports.conf = {
	enabled: true,
	guildonly: false,
	aliases: ["davet","dvt","dvtt"],
	permLevel: 0
  };
  exports.help = {
	name: "davet",
	description:"davet"
  };