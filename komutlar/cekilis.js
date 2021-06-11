const Discord = require('discord.js');
const ms = require('ms');
const path = require('path');
const db = require('quick.db')

module.exports.run = async (client, message, args) => { 
let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "*"; 
    let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');
    let hasRole = message.member.roles.cache.find(r => r.name === 'Çekiliş');

        if(hasPerm === false || !hasRole == null) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__HATA__')
                    .setColor('RED')
                    .setDescription('Bu komutu kullanmak için `MANAGE_MESSAGES` yetkisine veya ``Çekiliş`` adlı bir role ihtiyacınız var.')
                    .setTimestamp()
            )
        }

        if(!args[0]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__HATA__')
                    .setColor('RED')
                    .setDescription(`Lütfen hediyenin süresini girin.\n\nÖrnek kullanım: ${prefix}çekiliş-yap 1h 1 Nitro Classic`)
                    .setTimestamp()
            )
        }

        if(!args[1]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__HATA__')
                    .setColor('RED')
                    .setDescription(`Lütfen kazanan sayısını girin.\n\nÖrnek kullanım: ${prefix}çekiliş-yap 1h 1 Nitro Classic`)
                    .setTimestamp()
            )
        }

        if(!args[2]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__HATA__')
                    .setColor('RED')
                    .setDescription(`Lütfen kazanılacak ödülü girin.\n\nÖrnek kullanım: ${prefix}çekiliş-yap 1h 1 Nitro Classic`)
                    .setTimestamp()
            )
        }

        message.delete();

        client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnerCount: parseInt(args[1]),
            messages: {
                giveaway: "🎉 **ÇEKİLİŞ** 🎉",
                giveawayEnded: "🎉 **ÇEKİLİŞ BİTTİ** 🎉",
                timeRemaining: `\n\`⏲️\`・Kalan süre: **{duration}**!\n\`👑\`・Çekilişi yapan: ${message.author}\n\`🏆\`・Kazanan(lar): ${parseInt(args[1])}`,
                inviteToParticipate: "Katılmak için 🎉 emojisine tıklayın!",
                winMessage: `Tebrikler, {winners}! **{prize}** kazandın!`,
                embedFooter: "Çekiliş",
                noWinner: `\`⛔\`・Yeterli katılım olmadığı için hediye iptal edildi.\n\`👑\`・Çekilişi yapan: ${message.author}`,
                winners: `🏆・Kazanan(lar)`,
                endedAt: "Bitiş",
                units: {
                    seconds: "Saniye",
                    minutes: "Dakika",
                    hours: "Saat",
                    days: "Gün",
                    pluralS: false
                }
            }
        });


        client.giveawaysManager.on('giveawayRerolled', (giveaway, winners) => {
            winners.forEach((member) => {
                member.send('**Yeniden:** Tebrikler, '+member.user.username+', '+giveaway.prize+ ' Kazandın' );
            });
        });   
}
exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["çekiliş-yap"], 
  permLevel: 0 
};

exports.help = {
  name: 'çekiliş',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};