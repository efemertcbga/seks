const emran = require("discord.js"); 
const client = new emran.Client();
const token = "xDPIypzuHpHTRsXvTKKfaqzX"

/*

https://top.gg/api/docs#mybots Sitesinden DBL Tokeninizi alabilirsiniz.

*/

exports.run = (client, message) => {
  const clienta = new emran.Client();
const Galactica = require("galacticaapi.js");
const dbl = new Galactica(token, clienta);
    let hasVote = dbl.hasVoted(message.author.id);
        if(hasVote === true) {
 message.channel.send( new emran.MessageEmbed()
.setTitle("Başarılı!")
.setDescription("Sunucumuz da başarılı bir şekilde rolünüz verildi!")
.setColor("GREEN")
)
            message.member.roles.add("852238467777953812")    //Vericek rol id.
        } else {
             message.channel.send( new emran.MessageEmbed()
.setTitle("Hata")
.setColor("RED")
.setDescription("Sunucumuz da özel role sahip olabilmen için ilk öncelikle oy vermen gerekiyor!")
.addField("Oy Vermek için:", `[Buraya Tıkla!](https://top.gg/bot/${client.user.id}/vote)`)
.setFooter(client.user.username)
)
}
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oyverdim"],
  permLevel: 0
   
};

exports.help = {
  name: 'oy-verdim',
 description: 'Bota oy verirseniz rolü kaparsınız',
 usage: 'oyverdim'
};