const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

const girismesaj = [
  '**Bot Sunucuya Eklendi',
  '**turkbot** sunucunuzdaki insanlara kolaylıklar sağlar.',
  'Bot Her Türlü Komudu Vardır',
  'Herhangi bir yardıma ihtiyacınız olursa destek sunucumuza gelebilirsiniz.'
]

client.on('guildCreate', guild => {
    const generalChannel = guild.defaultChannel
    generalChannel.send(girismesaj);
})