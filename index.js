const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require("quick.db");
const request = require("request");
const ms = require("parse-ms");
require('./util/eventLoader.js')(client);
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// use port 3000 unless there exists a preconfigured port
var port = process.env.PORT || 3000;

app.listen(port);

const prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//Mod-log sistem
client.on('messageDelete', message => {

    if (message.author.bot || message.channel.type == "dm") return;
  
    let log = message.guild.channels.cache.get(await db.fetch(`log_${message.guild.id}`));
  
    if (!log) return;
    if (!message.author.bot) return;
  
    const embed = new Discord.MessageEmbed()
  
      .setTitle(message.author.username + " | Mesaj Silindi")
  
      .addField("Kullanıcı: ", message.author)
  
      .addField("Kanal: ", message.channel)
  
      .addField("Mesaj: ", "" + message.content + "")
  
    log.send(embed)
  
  })
  
  client.on("messageUpdate", async (oldMessage, newMessage) => {
  
    let modlog = await db.fetch(`log_${oldMessage.guild.id}`);
  
    if (!modlog) return;
    if (oldMessage.author.bot) return;
    if (newMessage.author.bot) return;
  
    let embed = new Discord.MessageEmbed()
  
    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())
  
    .addField("**Eylem**", "Mesaj Düzenleme")
  
    .addField("**Mesajın sahibi**", `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`)
  
    .addField("**Eski Mesajı**", `${oldMessage.content}`)
  
    .addField("**Yeni Mesajı**", `${newMessage.content}`)
  
    .setTimestamp()
  
    .setColor("RANDOM")
  
    .setFooter(`Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`, oldMessage.guild.iconURL())
  
    .setThumbnail(oldMessage.guild.iconURL)
  
    client.channels.cache.get(modlog).send(embed)
  
  });
  
  client.on("channelCreate", async(channel) => {
  
    let modlog = await db.fetch(`log_${channel.guild.id}`);
  
      if (!modlog) return;
  
      const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  
      let kanal;
  
      if (channel.type === "text") kanal = `<#${channel.id}>`
  
      if (channel.type === "voice") kanal = `\`${channel.name}\``
  
      let embed = new Discord.MessageEmbed()
  
      .setAuthor(entry.executor.username, entry.executor.avatarURL())
  
      .addField("**Eylem**", "Kanal Oluşturma")
  
      .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)
  
      .addField("**Oluşturduğu Kanal**", `${kanal}`)
  
      .setTimestamp()
  
      .setColor("RANDOM")
  
      .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())
  
      .setThumbnail(channel.guild.iconUR)
  
      client.channels.cache.get(modlog).send(embed)
  
      })
  
  client.on("channelDelete", async(channel) => {
  
    let modlog = await db.fetch(`log_${channel.guild.id}`);
  
      if (!modlog) return;
  
      const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  
      let embed = new Discord.MessageEmbed()
  
      .setAuthor(entry.executor.username, entry.executor.avatarURL())
  
      .addField("**Eylem**", "Kanal Silme")
  
      .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)
  
      .addField("**Silinen Kanal**", `\`${channel.name}\``)
  
      .setTimestamp()
  
      .setColor("RANDOM")
  
      .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())
  
      .setThumbnail(channel.guild.iconURL)
  
      client.channels.cache.get(modlog).send(embed)
  
      })
  
  client.on("roleCreate", async(role) => {
  
  let modlog = await db.fetch(`log_${role.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(entry.executor.username, entry.executor.avatarURL())
  
  .addField("**Eylem**", "Rol Oluşturma")
  
  .addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)
  
  .addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)
  
  .setTimestamp()
  
  .setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)
  
  .setColor("RANDOM")
  
  .setThumbnail(role.guild.iconURL)
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("roleDelete", async(role) => {
  
  let modlog = await db.fetch(`log_${role.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(entry.executor.username, entry.executor.avatarURL())
  
  .addField("**Eylem**", "Rol Silme")
  
  .addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)
  
  .addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)
  
  .setTimestamp()
  
  .setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)
  
  .setColor("RANDOM")
  
  .setThumbnail(role.guild.iconURL)
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("emojiCreate", async(emoji) => {
  
  let modlog = await db.fetch(`log_${emoji.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(entry.executor.username, entry.executor.avatarURL())
  
  .addField("**Eylem**", "Emoji Oluşturma")
  
  .addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)
  
  .addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)
  
  .setTimestamp()
  
  .setColor("RANDOM")
  
  .setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)
  
  .setThumbnail(emoji.guild.iconURL)
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("emojiDelete", async(emoji) => {
  
  let modlog = await db.fetch(`log_${emoji.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(entry.executor.username, entry.executor.avatarURL())
  
  .addField("**Eylem**", "Emoji Silme")
  
  .addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)
  
  .addField("**Silinen emoji**", `${emoji}`)
  
  .setTimestamp()
  
  .setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)
  
  .setColor("RANDOM")
  
  .setThumbnail(emoji.guild.iconURL)
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("emojiUpdate", async(oldEmoji, newEmoji) => {
  
  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(entry.executor.username, entry.executor.avatarURL())
  
  .addField("**Eylem**", "Emoji Güncelleme")
  
  .addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)
  
  .addField("**Güncellenmeden önceki emoji**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)
  
  .addField("**Güncellendikten sonraki emoji**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)
  
  .setTimestamp()
  
  .setColor("RANDOM")
  
  .setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)
  
  .setThumbnail(oldEmoji.guild.iconURL)
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("guildBanAdd", async(guild, user) => {
  
  let modlog = await db.fetch(`log_${guild.id}`);
  
  if (!modlog) return;
  
  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(entry.executor.username, entry.executor.avatarURL())
  
  .addField("**Eylem**", "Yasaklama")
  
  .addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)
  
  .addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)
  
  .addField("**Yasaklanma sebebi**", `${entry.reason}`)
  
  .setTimestamp()
  
  .setColor("RANDOM")
  
  .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)
  
  .setThumbnail(guild.iconURL)
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("guildBanRemove", async(guild, user) => {
  
  let modlog = await db.fetch(`log_${guild.id}`);
  
  if (!modlog) return;
  
  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(entry.executor.username, entry.executor.avatarURL())
  
  .addField("**Eylem**", "Yasak kaldırma")
  
  .addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)
  
  .addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)
  
  .setTimestamp()
  
  .setColor("RANDOM")
  
  .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)
  
  .setThumbnail(guild.iconURL)
  
  
  client.channels.cache.get(modlog).send(embed)
  
  })

  // Reklam Engel //
////reklam-engel

const reklam = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    "net",
    ".rf",
    ".gd",
    ".az",
    ".party",
    ".gf",
    ".penis",
    ".sky",
    ".tv"
  ];
client.on("messageUpdate", async (old, nev) => {

if (old.content != nev.content) {
let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
if (i) {
  
  if (reklam.some(word => nev.content.includes(word))) {
  if (nev.member.hasPermission("BAN_MEMBERS")) return ;
   //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` ${nev.author} , **Mesajını Editleyerek Reklam Yapmaya Çalıştı!**`)
        .addField("Reklamı:",nev)
    
        nev.delete();
        const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` ${nev.author} , **Mesajı Editleyerek Reklam Yapamana İzin Veremem!**`) 
      client.channels.cache.get(y).send(embed)
        nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
      
  }
} else {
}
if (!i) return;
}
});

client.on("message", async msg => {

 
if(msg.author.bot) return;
if(msg.channel.type === "dm") return;
     let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);

let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
      if (i) {
          if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
            try {
             if (!msg.member.hasPermission("MANAGE_GUILD")) {
             //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
 msg.delete({timeout:750});
                const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` <@${msg.author.id}> , **Bu Sunucuda Reklam Yapmak Yasak!**`)
  msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
            const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` ${msg.author} , **Reklam Yapmaya Çalıştı!**`) .addField("Mesajı:",msg)
           client.channels.cache.get(y).send(embed)
              }              
            } catch(err) {
              console.log(err);
            }
          }
      }
     if(!i) return ;
});


//reklam engel son //

//// Seviye ///
client.on("message", async msg => {
  const request = require("node-superfetch");
  const db = require("quick.db");

  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;

  if (msg.content.length > 7) {
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 1);
  }

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 150) {
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1);

    msg.channel.send(
      `Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${db.fetch(
        `seviye_${msg.author.id + msg.guild.id}`
      )}** seviye oldun!`
    );

    db.delete(`puancik_${msg.author.id + msg.guild.id}`);
  }
});
// canvaslı giriş //
client.on("guildMemberRemove", async member => {
  //let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  //const canvaskanal = member.guild.channels.cache.get(resimkanal[member.guild.id].resim);
  
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
  if (!canvaskanal) return;

  const request = require("node-superfetch");
  const Canvas = require("canvas")
  Canvas.registerFont('./fonts/impact.ttf', { family: 'Impact' })
    Image = Canvas.Image,
    path = require("path");

  var randomMsg = ["Sunucudan Ayrıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/837673001091989516/850401720492490792/seks-ayrld.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px Impact`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ToxyBot.png"
  );

    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
  
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));

  if (!canvaskanal || canvaskanal ===  undefined) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas")
  Canvas.registerFont('./fonts/impact.ttf', { family: 'Impact' })
    Image = Canvas.Image,
    path = require("path");

  var randomMsg = ["Sunucuya Katıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/837673001091989516/850401718684614757/seks-katildi.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px Impact`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ToxyBot.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});
//canvaslı giriş son //

////RESIMLI GUVENLIK////

client.on('guildMemberAdd',async member => {
  let user = client.users.cache.get(member.id);
  let kanal = client.channels.cache.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://i.hizliresim.com/DWmOSd.png')
    const resim2 = await Canvas.loadImage('https://i.hizliresim.com/hIvMtu.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1


     const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/837673001091989516/840396338448695356/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_.png");
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   if (!kanal) return
       const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'güvenlik.png');
    kanal.send(attachment)
});

///////////RESIMLI GUVENLIK////

///keps lock///
client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
    if(msg.author.bot) return;  
      if (msg.content.length > 4) {
       if (db.fetch(`capslock_${msg.guild.id}`)) {
         let caps = msg.content.toUpperCase()
         if (msg.content == caps) {
           if (!msg.member.hasPermission("ADMINISTRATOR")) {
             if (!msg.mentions.users.first()) {
               msg.delete()
               return msg.channel.send(`:x: ${msg.author}, bre susak capslock kapat.`).then(m => m.delete(5000))
   }
     }
   }
 }
}
});

client.on("messageUpdate", async newmsg => {
  if (newmsg.channel.type === "dm") return;
    if(newmsg.author.bot) return;  
      if (newmsg.content.length > 4) {
       if (db.fetch(`capslock_${newmsg.guild.id}`)) {
         let caps = newmsg.content.toUpperCase()
         if (newmsg.content == caps) {
           if (!newmsg.member.hasPermission("ADMINISTRATOR")) {
             if (!newmsg.mentions.users.first()) {
               newmsg.delete()
               return newmsg.channel.send(`:x: ${newmsg.author}, bre susak capslock kapat.`).then(m => m.delete(5000))
   }
     }
   }
 }
}
});
//keps lok son///

//küfür engel //
const küfür = [
  "siktir",
  "fuck",
  "puşt",
  "pust",
  "piç",
  "sikerim",
  "sik",
  "yarra",
  "yarrak",
  "amcık",
  "orospu",
  "orosbu",
  "orosbucocu",
  "oç",
  ".oc",
  "ibne",
  "yavşak",
  "bitch",
  "dalyarak",
  "amk",
  "awk",
  "taşak",
  "taşşak",
  "daşşak",
"sikm",
"sikim",
"sikmm",
"skim",
"skm",
"sg",
"aq",
".siktir",
  ".fuck",
  ".puşt",
  ".pust",
  ".piç",
  ".sikerim",
  ".sik",
  ".yarra",
  ".yarrak",
  ".amcık",
  ".orospu",
  ".orosbu",
  ".orosbucocu",
  ".oç",
  ".oc",
  "i.bne",
  ".yavşak",
  ".bitch",
  ".dalyarak",
  ".amk",
  "..awk",
  ".taşak",
  ".taşşak",
  ".daşşak",
".s!km",
"s2ş",
"s!ikmm",
"skim",
"skm",
"sg",
"aq"
];
client.on("messageUpdate", async (old, nev) => {

if (old.content != nev.content) {
let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
if (i) {

if (küfür.some(word => nev.content.includes(word))) {
if (nev.member.hasPermission("BAN_MEMBERS")) return ;
 //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(` ${nev.author} , **Mesajını Editleyerek Küfür Etmeye Çalıştı!**`)
      .addField("Küfür:",nev)
  
      nev.delete();
      const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`${nev.author} , **Mesajı Editleyerek Küfür Etmene İzin Veremem!**`) 
    client.channels.cache.get(y).send(embed)
      nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
    
}
} else {
}
if (!i) return;
}
});

client.on("message", async msg => {


if(msg.author.bot) return;
if(msg.channel.type === "dm") return;
   let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);

let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
    if (i) {
        if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
          try {
           if (!msg.member.hasPermission("MANAGE_GUILD")) {
           //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
msg.delete({timeout:750});
              const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<@${msg.author.id}> , **Bu Sunucuda Küfür Yasak!**`)
msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
          const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`${msg.author} , **Küfür Etmeye Çalıştı!**`) .addField("Mesajı:",msg)
         client.channels.cache.get(y).send(embed)
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
   if(!i) return ;
});

//küfür engel son //

/// OTOROL SİSTEMİ

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;

  if (!mesaj) {
    client.channels.cache
      .get(kanal)
      .send(
        "" +
          member.user.username +
          "** Hoşgeldin! Otomatik Rolün Verildi Seninle Beraber** " +
          member.guild.memberCount +
          " **Kişiyiz!**"
      );
    return member.roles.add(rol);
  }

  if (mesaj) {
    var mesajs = mesaj
      .replace("-uye-", `${member.user}`)
      .replace("-uyetag-", `${member.user.tag}`)
      .replace("-rol-", `${member.guild.roles.cache.get(rol).name}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`);
    member.roles.add(rol);
    return client.channels.cache.get(kanal).send(mesajs);
  }
});

// OTOROL SON

/// YASAKLI TAG

client.on("guildMemberAdd", async member => {
  let guild = member.guild;
  let user = guild.members.cache.get(member.id);

  const tag = await db.fetch(`banned-tag.${guild.id}`);
  const sayı = await db.fetch(`atıldın.${guild.id}.${user.id}`);
  if (user.user.username.includes(tag)) {
    if (sayı === null) {
      await db.add(`atıldın.${guild.id}.${user.id}`, 1);
      user.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor(guild.name, guild.iconURL)
          .setDescription(
            `Sunucumuzun yasaklı tagında bulunduğunuz için atıldınız, tekrar giriş yapmayı denerseniz **yasaklanacaksınız**!`
          )
      );
      await user.kick();
    }

    if (sayı === 1) {
      await db.delete(`atıldın.${guild.id}.${user.id}`);
      user.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor(guild.name, guild.iconURL)
          .setDescription(
            `Sunucumuzun yasaklı tagında bulunduğunuz için atılmıştınız, tekrar giriş yapmayı denediğiniz için **${guild.name}** sunucusundan kalıcı olarak **yasaklandınız**!`
          )
      );
      await user.ban();
    }
  }
});

//YASAKLI TAG

// SAYAÇ SİSTEMİ

client.on("guildMemberAdd", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!kanal) return;
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacHG_${member.guild.id}`);
  ///....

  ///....
  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(
        " `" +
          member.user.username +
          "`**Adlı Kullanıcı Aramıza Katıldı!** `" +
          sayaç +
          "` **Kişi Olmamıza** `" +
          sonuç +
          "` **Kişi Kaldı.** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
  }

  if (member.guild.memberCount == sayaç) {
    return client.channels
      .get(kanal)
      .send(
        ` **Sayaç Sıfırlandı!** \`${member.guild.memberCount}\` **Kişiyiz!**`
      );
      
  }
  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uye-", `${member.user.username}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});

client.on("guildMemberRemove", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesajs = await db.fetch(`sayac_${member.guild.id}`);
  if (!kanal) return;
  if (!sayaç) return;
  ///....

  if (!mesajs) {
    return client.channels.cache
      .get(kanal)
      .send(
        " `" +
          member.user.username +
          "` **Adlı Kullanıcı Aramızdan Ayrıldı.**`" +
          sayaç +
          "` **Kişi Olmamıza** `" +
          sonuç +
          "` **Kişi Kaldı.** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
  }

  if (mesajs) {
    const mesaj31a = mesajs
      .replace("-uye-", `${member.user.username}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31a);
  }
});
// SAYAÇ SİSTEMİ

//sa-as

   
 client.on("message", async msg => {
  let saas = await db.fetch(`saas_${msg.guild.id}`);
  if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'sa' || msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'sea' || msg.content.toLowerCase() == 'sae' || msg.content.toLowerCase() == 'selamün aleyküm' || msg.content.toLowerCase() == 'saa' || msg.content.toLowerCase() == 'seaa' || msg.content.toLowerCase() == 'Selam') {
    msg.reply('<a:pikacu:842180536792776745> Aleyküm Selam. Hoş Geldin!').then(msg => msg.delete({ timeout: 8000, reason: '.' }));
  }
  }
});
//ROL VE KANAL KORUMA
client.on("roleCreate", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Rol`, role.name)
      .addField(`Sonuç`, `Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor("BLACK")
      .addField(`Rolu Açan`, entry.executor.tag)
      .addField(`Açılan Rol`, role.name)
      .addField(`Sonuç`, `Açılan Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelDelete", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Açıldı!`)

      .setColor("BLACK");
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Kanalı Silen`, entry.executor.tag)
      .setColor("BLACK")
      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Silinen Kanal Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelCreate", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Kanalı Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Açılan Kanal Geri Silindi`);
    client.channels.cache.get(kanal).send(embed);
  }
});
// Ban ve Rol Koruma Devam
client.on("guildBanAdd", async (guild, user) => {
  let kontrol = await db.fetch(`dil_${guild.id}`);
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor("BLACK")
      .addField(`Yasaklayan`, entry.executor.tag)
      .addField(`Yasaklanan Kişi`, user.name)
      .addField(
        `Sonuç`,
        `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
      );
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor("BLACK")
      .addField(`Yasaklayan`, entry.executor.tag)
      .addField(`Yasaklanan Kişi`, user.name)
      .addField(
        `Sonuç`,
        `Yasaklayan Kişi Sunucudan Atıldı ve yasaklanan kişinin yasağı kalktı `
      );
    client.channels.cache.get(kanal).send(embed);
  }
});
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor("BLACK")
      .addField(`Silen`, entry.executor.tag)
      .addField(`Silinen Rol`, role.name)
      .addField(`Sonuç`, `Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor("BLACK")
      .addField(`Silen`, entry.executor.tag)
      .addField(`Silinen Rol`, role.name)
      .addField(`Sonuç`, `Silinen Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

//atildim
client.on('guildDelete', guild => {

  let plasmic = new Discord.MessageEmbed()
  
  .setColor("RANDOM")
  .setTitle(" Bot Kicklendi ")
  .addField("Sunucu Adı:", guild.name)
  .addField("Sunucu sahibi", guild.owner)
  .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
  .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
  .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
  
     client.channels.cache.get('837673000828403740').send(plasmic);
   
  });
  
  //eklendim
  
  client.on('guildCreate', guild => {
  
  let plasmicc = new Discord.MessageEmbed()
  
  .setColor("RANDOM")
  .setTitle(" Bot Eklendi ")
  .addField("Sunucu Adı:", guild.name)
  .addField("Sunucu sahibi", guild.owner)
  .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
  .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
  .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
  
     client.channels.cache.get('837673000828403740').send(plasmicc);
  
  }); 
  //eklendim atildim bitis
  //dmlog
  client.on("message", msg => {
  var dm = client.channels.cache.get("837673001091989514")
  if(msg.channel.type === "dm") {
  if(msg.author.id === client.user.id) return;
  const botdm = new Discord.MessageEmbed()
  .setTitle(`🔔 Yeni Bir Mesajım Var`)
  .setTimestamp()
  .setColor("RED")
  .setThumbnail(`${msg.author.avatarURL()}`)
  .addField("Gönderen", msg.author.tag)
  .addField("Gönderen ID", msg.author.id)
  .addField("Gönderilen Mesaj", msg.content)
  
  dm.send(botdm)
  
  }
  if(msg.channel.bot) return;
  });
  //dmlog bitis
  //afk
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (db.has(`afk-${message.author.id}+${message.guild.id}`)) {
      const info = db.get(`afk-${message.author.id}+${message.guild.id}`);
      db.delete(`afk-${message.author.id}+${message.guild.id}`);
      if (message.guild.owner.id !== message.author.id) {
        message.member.setNickname(null)
      }
      message.channel.send(`Hoş geldin ${message.author}, AFK'nı kaldırdım`);
    }
    if (message.mentions.members.first()) {
      if (
        db.has(
          `afk-${message.mentions.members.first().id}+${message.guild.id}`
        )
      ) {
        message.channel.send(
          `${message.mentions.members.first().user.tag} adlı kullanıcı AFK: ` +
            db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
        );
      } else return;
    } else;
  }) 
  //afk bitis
///////////çekiliş////
const { GiveawaysManager } = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        embedColor: "GOLD",
        reaction: "🎉"
    }
});

client.giveawaysManager = manager;

///son///

client.on("message" , async msg => {
  if(msg.content.startsWith(prefix+"afk")) return;
 
  let afk = msg.mentions.users.first()
 
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
 
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){
   const afkembedefe = new Discord.MessageEmbed()
      .setAuthor(`ToxyBot Afk Sistemi`)
      .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
      .setColor("RED")
      .setFooter(`ToxyBot Gelişmiş Afk Sistemi`, client.user.avatarURL())
      .setTimestamp()

 
       msg.reply(afkembedefe)
   }
 }
  if(msg.author.id === kisi){
const afkcıkısefe = new Discord.MessageEmbed()
    .setAuthor(`ToxyBot Afk Sistemi`)
    .setDescription(`AFK'lıktan Çıktınız!`)
    .setColor("RANDOM")
    .setFooter(`ToxyBot Gelişmiş Afk Sistemi`, client.user.avatarURL())
    .setTimestamp()
 
       msg.reply(afkcıkısefe)
  db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
   msg.member.setNickname(isim)
   
 }
 
});


client.on('messageDelete', message => {
    const data = require("quick.db")
    data.set(`snipe.mesaj.${message.channel.id}`, message.content)
    data.set(`snipe.id.${message.channel.id}`, message.author.id)

  })