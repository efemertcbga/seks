const Discord = require("discord.js");
const fs = require("fs");
const { stripIndents } = require('common-tags');
const slots = ['🔧', '💎', '💰', '💵', '💳'];
const db = require('quick.db');
exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  

  
    let para = await db.fetch(`paracık_${message.author.id}`);
 
  
  
 


    if (para < 15) {
      message.channel.send(`< Bu oyunu oynayabilmek için en az \`15 TL\` olması gerekir.`)
  } else if (para > 15) {

    


  
  var sans = ["11", "15", "20", "24", "28", "31", "39", "45", "49", "54", "47", "19", "81", "21", "73", "37", "80", "13", "96", "34", "21", "150", "31"];
    var miktar = sans[Math.floor((Math.random() * sans.length))];
       
		const slotOne = slots[Math.floor(Math.random() * slots.length)];
		const slotTwo = slots[Math.floor(Math.random() * slots.length)];
		const slotThree = slots[Math.floor(Math.random() * slots.length)];
		if (slotOne === slotTwo && slotOne === slotThree) {

      db.add(`paracık_${message.member.id}`, miktar)
       
     
		var kazandin = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setDescription(` Kazandın ve hesabına **${miktar}TL** eklendi.`)
    return message.channel.send(kazandin)
   

		}

     
 

		var kaybettin = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(`Kaybettin ve hesabından **${miktar}TL** eksildi.`)
    db.add(`paracık_${message.member.id}`, -miktar)
    return message.channel.send(kaybettin);	
    
  } else if (para = 15) {

    


  
    var sans = ["11", "15", "20", "24", "28", "31", "39", "45", "49", "54", "47", "19", "81", "21", "73", "37", "80", "13", "96", "34", "21", "150", "31"];
      var miktar = sans[Math.floor((Math.random() * sans.length))];
         
      const slotOne = slots[Math.floor(Math.random() * slots.length)];
      const slotTwo = slots[Math.floor(Math.random() * slots.length)];
      const slotThree = slots[Math.floor(Math.random() * slots.length)];
      if (slotOne === slotTwo && slotOne === slotThree) {
  
        db.add(`paracık_${message.member.id}`, miktar)
         
       
      var kazandin = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<:var:840374348745539614> Kazandın ve hesabına **${miktar}TL** eklendi.`)
      return message.channel.send(kazandin)
     
  
      }
  
       
   
  
      var kaybettin = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`<:hayir:839223750457163867> Kaybettin ve hesabından **${miktar}TL** eksildi.`)
      db.add(`paracık_${message.member.id}`, -miktar)
      return message.channel.send(kaybettin);	
      
    }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kazıkazıklan-oyna","kazı-kazıklan"],
  permLevel: 0,
  kategori: "oyun",
};

exports.help = {
  name: "kazıkazıklan",
  description: "Kazı kazan oynarsınız ve rastgele para çıkarırsınız.",
  usage: "kazıkazıklan",
};