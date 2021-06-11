const { MessageEmbed } = require('discord.js')
const data = require('quick.db')


   exports.run = async(client, message, args) => {
     if (!message.member.hasPermission("MANAGE_MESSAGES")) {
          const embed = new MessageEmbed()
            .setDescription(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`)
            .setColor("RED")
        return  message.channel.send(embed)}
    const emirhan = await data.fetch(`snipe.id.${message.channel.id}`)
    if(!emirhan) {
    const embeds = new MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(`Mesaj bulunamadı!`)
.setColor(`#f3c7e1`)
    message.channel.send(embeds);
          } else {
  let kullanıcı = client.users.cache.get(emirhan);
  const silinen = await data.fetch(`snipe.mesaj.${message.channel.id}`)
  const embed = new MessageEmbed()
  .setAuthor(kullanıcı.username, kullanıcı.avatarURL())
  .setDescription(`Silinen mesaj => ` + silinen)
.setColor(`#f3c7e1`)
  message.channel.send(embed) }
}
exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
}
exports.help = {
  name: "snipe",
  description: 'Son silinen mesajı yakalar.',
  usage: 'snipe'
} 