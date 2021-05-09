const discord = require('discord.js')
const client = new discord.Client({ disableMentions: "everyone"})
const { hangman } = require('reconlx')
const fs = require('fs');
client.on('ready', () => {
    console.log("Connected")
  //  client.user.setStatus('idle')
  client.user.setActivity({type: "PLAYING", name: 'DM to contact staff'})
   // client.user.setPresence({status: "idle"})
})
const { ServerID } = require('./config.json')
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
const blacklist = require('./models/blacklist');
const db1 = require('./models/command');
let modules = ["other"];
const moment = require('moment')
const mongoose = require('mongoose');
const { re } = require('mathjs');
mongoose.connect('mongodb+srv://meme:Zrw7iDPAopyM09au@cluster0.ou1tz.mongodb.net/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(console.log('MongoDB connected ✅✅'))

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(error, files) {
    if (error) return new Error(`${error}`);
    files.forEach(function(file) {
      if (!file.endsWith(".js"))
        throw new Error(`A File Does Not End With .js!`);
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} Has Been Loaded - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      
      //if (command.aliases.length === 0) command.aliases = null;
    });
  });
});

    client.on("message", async message => {
      if(message.author.bot) return;
      if (message.content.startsWith('#')) return;
      let prefix = ".";
      let args = message.content.slice(prefix.length).split(' ');
      let command = args.shift().toLowerCase();
    
      if(message.guild) {
          // if (command == "h") {
          //   let newGuildEmbed = new discord.MessageEmbed()
          //   .setAuthor('Greeting', client.user.displayAvatarURL({dynamic: true}))
          //   .setDescription('Здравствуйте! Я - Ayana ModMail, через меня модераторы могут оказывать помощь участникам. Пропишите ``a.help`` и откроется список моих команд. Я только развивающийся бот, поэтому, особенно Кики, просто за существование бота или если что-то пойдёт не так, строго не судите. Рада знакомству. (И да, моя аватарка полный улёт)))')
          //   .setFooter("Created by Faizz#0001", "https://cdn.discordapp.com/avatars/640889847866851329/f9a46c6d1dec7a89c95eb77eee9e59e6.webp?size=1024")
          //   .setColor("BLUE")
          //   .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
          //   //message.delete()
          //   message.channel.send(newGuildEmbed)
           /*} else*/ if(command == "setup") {
              if(!message.member.hasPermission("MANAGE_CHANNELS")) {
                  return; //message.channel.send("Вам нужны права администратора")
              }
    
    
    
              
              let role = message.guild.roles.cache.find((x) => x.name == "Helper")
              let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")
    
              if(!role) {
                  role = await message.guild.roles.create({
                      data: {
                          name: "Helper",
                          color: "BLUE"
                      },
                      reason: "The role is required for the operation of the Modmail system"
                  })
              }
    
              await message.guild.channels.create("MODMAIL", {
                  type: "category",
                  topic: "All cases will be here",
                  permissionOverwrites: [
                      {
                          id: role.id,
                          allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                      }, 
                      {
                          id: everyone.id,
                          deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                      }
                  ]
                  
              })
                const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")
                    const storychannel = await message.guild.channels.create("conversations", {
                      type: "text",
                    parent: category.id,
                    topic: "Conversation history is saved here"
                  })
    
              let setupComplete = new discord.MessageEmbed()
              .setAuthor('Setup Completed', client.user.displayAvatarURL({dynamic: true}))
              .setDescription("Setup completed.\n\nNotes:\n1. Do not change the name of the bot category. (I created category)\n2. Do not change the names of channels in this category. (there will be those who need help)\n3. Do not change the name of the created role. (I created Helper role, give it to those who will be supporter)")
              .setColor("BLUE")
              return message.channel.send(setupComplete)
    
          } else if(command == "close") {
            if(!message.member.roles.cache.find((x) => x.name == "Helper")) {
              return;// message.channel.send("You don't have ``Support`` role, if it doesn't exist, type ``.setup``")
          }
    
            if(message.channel.parentID == message.guild.channels.cache.find((x) => x.name == "MODMAIL").id) {
                
                const person = message.guild.members.cache.get(message.channel.name)
    
                if(!person) {
                    let embed11 = new discord.MessageEmbed()
                    .setDescription("**An error has occurred. Possible reasons:**\n1. Channel name has been changed.\n2. The user is no longer on this server.\n3. The bot was strained.\nDelete the channel by yourself.\n\n__The bot will not be able to notify the user about the completion of the case.__")
                    .setColor("RED")
                    return message.channel.send(embed11)
                }
    
                let closingChannelEmbed = new discord.MessageEmbed()
                .setDescription('Closing channel...')
                .setColor("BLUE");
                
                await message.channel.send(closingChannelEmbed).then((message) => {
                    setTimeout(function() {
                                message.channel.delete();
                                    }, 200)
                                })
                 
                //if (message.content.startsWith("a.close" || "A.close")) return;
                //await message.channel.delete()
    
                // let yembed = new discord.MessageEmbed()
                // .setAuthor("MAIL CLOSED", client.user.displayAvatarURL())
                // .setColor("RED")
                // .setThumbnail(client.user.displayAvatarURL())
                // .setFooter("Mail is closed by " + message.author.username)
                // if(args[0]) yembed.setDescription(args.join(" "))
    
                // return person.send(yembed)

                let zembed = new discord.MessageEmbed()
                .setAuthor("Rate us")
                .setDescription("Please, take a couple of seconds for us and rate our work on a 5-point scale")
                .setColor("BLUE")

                let yembed = new discord.MessageEmbed()
                .setAuthor("Mail closed", "https://images.discordapp.net/avatars/618128648825733153/15798b8534b8c2df7e378528df2a279c.png?size=512")
                .setColor('GREEN')
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription("Supporter closed the case. We hope you received an answer to your question or your request was accepted. If you have any questions, contact us.")
                .setFooter(`Case was closed by ${message.author.tag} | Support team`)
                 return person.send(yembed)

            }
          } else if(command == "open") {
              const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")
    
              let noCategory = new discord.MessageEmbed()
              noCategory.setDescription(``)
    
              if(!category) {
                  return message.channel.send("Modmail system is not configured, type ``.setup``")
              }
    
              if(!message.member.roles.cache.find((x) => x.name == "Helper")) {
                  return message.channel.send("You don't have ``Helper`` role, if it doesn't exist, type ``.setup``")
              }
    
              if(!args[0] || !args.length) {
                  return message.channel.send("Enter the user.")
              }
    
              const target = message.guild.members.cache.find((x) => x.id === args[0])
              let targetByname = message.mentions.members.first()
    
              if(!targetByname) {
                  let wait = new discord.MessageEmbed()
                  wait.setDescription("Opening channel...")
                  wait.setColor("YELLOW")
    
                const errorsUserNotFound = {
                    notDetectedInThisServer: ""
                }
    
                  let errorUserNotFound = new discord.MessageEmbed()
                  errorUserNotFound.setDescription("No such member could be found.")
                  errorUserNotFound.setColor("RED")
    
                  return message.channel.send(wait).then((msg) => {
                    setTimeout(function() {
                        msg.edit(errorUserNotFound);
                    }, 500)
                });
              }
    
    
              const channel = await message.guild.channels.create(targetByname.id, {
                  type: "text",
                parent: category.id,
                topic: "Created by **" + message.author.username + "**"
              })
    
              let statuses = {
                waiting: "Pending",
                accepted: "Accepted",
                inProgress: "In progress",
                closed: "Closed",
                ended: "Ended"
            }
              
              const dateCreated = moment(targetByname.user.createdAt)
    
              //let CaseID = 1
              let nembed = new discord.MessageEmbed()
              .setAuthor("Details", targetByname.user.displayAvatarURL({dynamic: true}))
              .setTitle("Outgoing request")
              .setColor("BLUE")
              .setThumbnail(targetByname.user.displayAvatarURL({dynamic: true}))
              .setDescription(message.content)
              .addField("Nickname", `${targetByname.user.username}#${targetByname.user.discriminator}`)
              .addField("ID", targetByname.user.id)
              .addField("Account creation date", dateCreated.format("DD.MM.YYYY HH:mm:ss"))
              .addField("Status", statuses.waiting)
              .addField("Request created by support", "Yes")
              .setFooter('Messages starting with \'#\', are not sent.')
              //.addField("ID", `${CaseID++}`);
    
              channel.send(nembed)
    
              let uembed = new discord.MessageEmbed()
              .setAuthor("Mail opened", "https://images.discordapp.net/avatars/618128648825733153/15798b8534b8c2df7e378528df2a279c.png?size=512")
              .setColor("BLUE")
              .setThumbnail(client.user.displayAvatarURL())
              .setDescription("You are contacted from **"+ message.guild.name + "**, please wait for a message from support.");
              
              
              targetByname.send(uembed);
    
              let newEmbed = new discord.MessageEmbed()
              .setDescription("Opening channel...")
              .setColor("YELLOW");
    
              let createdChannelEmbed = new discord.MessageEmbed()
              .setDescription("Channel created: <#" + channel + ">")
              .setColor("GREEN");
    
              const ownerID = 640889847866851329;
              return message.channel.send(newEmbed).then((msg) => {
                  setTimeout(function() {
                      msg.edit(createdChannelEmbed);
                  }, 500)
              });
    
            
    
          } else if(command == "modmailhelp") {
             // if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
              if(!message.member.roles.cache.find((x) => x.name == "Helper")) {
                return;// message.channel.send("You don't have ``Support`` role, if it doesn't exist, type ``.setup``")
            }
            const ownerID = 640889847866851329;
              let embed = new discord.MessageEmbed()
              .setAuthor('TEC ModMail Bot', client.user.displayAvatarURL())
              .setColor("BLUE")
              
            .setDescription("Smart Modmail bot that makes life easier.")
            .addField(prefix + "setup", "Configure a bot for the server (required action)", true)
      
            .addField(prefix + "open <@member>", 'Open a dialog with the user.', true)
            .setThumbnail(client.user.displayAvatarURL())
                        .addField(prefix + "close", "Close a dialog with the user.", true)
                        //.addField(prefix + "blacklist", "Внести пользователя в чёрный список бота.", true)
                        //.addField(prefix + "whitelist", "Вынести человека с чёрного списка.", true)
                        //.setFooter("Created by Faizz#0001", "https://cdn.discordapp.com/avatars/640889847866851329/f9a46c6d1dec7a89c95eb77eee9e59e6.webp?size=1024")
                        
    
                        return message.channel.send(embed)
              
          }
      } 
      
      
      
      
      
      
      
      if(message.channel.parentID) {
    
        const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")
       
        if(message.channel.parentID == category.id) {
            let member = message.guild.members.cache.get(message.channel.name)
        
            if(!member) return message.channel.send('Message could not be sent.')
        
            let lembed = new discord.MessageEmbed()
            .setColor("GREEN")
            .setFooter(message.author.username + ' | Support team', message.author.displayAvatarURL({dynamic: true}))
            .setDescription(message.content)
        
            return member.send(lembed)
        }
        
        
          } 
    
      if(!message.guild) {
          const guild = await client.guilds.cache.get(ServerID);
          if(!guild) return;
    
          const main = guild.channels.cache.find((x) => x.name == message.author.id)
          const category = guild.channels.cache.find((x) => x.name == "MODMAIL")
    
    
          if(!main) {
              let mx = await guild.channels.create(message.author.id, {
                  type: "text",
                  parent: category.id,
                  topic: "Created to help **" + message.author.tag + " **"
              })
    
              let sembed = new discord.MessageEmbed()
              .setAuthor("Pending", "https://images.discordapp.net/avatars/618128648825733153/15798b8534b8c2df7e378528df2a279c.png?size=512")
              .setColor("BLUE")
              .setThumbnail(client.user.displayAvatarURL())
              .setDescription("Your request has been sent to the moderators. Please wait.")
              message.author.send(sembed)
    
              
              const dateCreated = moment(message.author.createdAt)
              let statuses = {
                waiting: "Pending",
                accepted: "Accepted",
                inProgress: "In progress",
                closed: "Closed",
                ended: "Ended"
            }
              
          //#     
               let requestEmbed = new discord.MessageEmbed()
              .setAuthor("Details", message.author.displayAvatarURL({dynamic: true}))
              .setTitle("Incoming request")
              .setDescription(message.content)
              .addField("Nickname", `${message.author.username}#${message.author.discriminator}`)
              .addField("ID", message.author.id)
              .addField("Account creation date", dateCreated.format("DD.MM.YYYY HH:mm:ss"))
              .addField("Status", statuses.waiting)
              .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
              .setColor("BLUE")
              //.setDescription("Нажмите на реакцию, чтобы принять входящий запрос")
              mx.send("<@&730178351830007900>")
              mx.send(requestEmbed).then(function(message) {
                    message.react('✅')
              })
          //## 
              
    
              
    
              client.on('messageReactionAdd', async (reaction, user) => {
                let requestAccepted = new discord.MessageEmbed()
                requestAccepted.setAuthor('Mail opened', "https://images.discordapp.net/avatars/618128648825733153/15798b8534b8c2df7e378528df2a279c.png?size=512")
                requestAccepted.setDescription(`Supporter **${user.username}** accepted your request, expect to get in touch.`)
                requestEmbed.addField("Content", message.content)
                requestAccepted.setColor("BLUE")
                requestAccepted.setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                requestAccepted.setFooter(`${user.tag}`, `${user.displayAvatarURL({dynamic: true})}`)
    
                  if (reaction.message.partial) await reaction.message.fetch();
                  if (reaction.partial) await reaction.fetch();
                  if (user.bot) return;
                  if (!reaction.message.guild) return;
                  if (reaction.emoji.name === "✅") {
                    let eembed = new discord.MessageEmbed()
                    .setAuthor("Details", message.author.displayAvatarURL({dynamic: true}))
                    .setColor("BLUE")
                    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                    .setDescription(message.content)
                    .addField("Nickname", `${message.author.username}#${message.author.discriminator}`)
                    .addField("ID", message.author.id)
                    .addField("Account creation date", dateCreated.format("DD.MM.YYYY HH:mm:ss\n"))
                    .addField("Status", `${statuses.inProgress}\n`)
                    .addField("Request created by support", "No")
                    .addField("Supportive person", `${user.tag}`)
                    .setFooter('Messages starting with \'#\', are not sent.')
                      reaction.message.delete();
                      //await message.de(requestEmbed);
                      //if (message.author != user.username) return;
                      //await mx
                      //if (message.author !== user.username) return;
                      await mx.send(eembed);
                      await message.author.send(requestAccepted)
                  }
              })
    
           
    
            //return await mx.send(eembed)
          }
    
          let xembed = new discord.MessageEmbed()
          .setColor("YELLOW")
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setDescription(message.content)
    
    
          main.send(xembed)
    
       }
    });

    client.on("message", async message => {
      let prefix = ".";
      if (message.content.startsWith(prefix + "help")) {
        let embed = new discord.MessageEmbed()
        embed.setTitle('My commands!')
        embed.setDescription("My prefix - .\n\n``ping`` - check bot latency\n``topic`` - get a topic for conversation\n``avatar`` - check user's avatar\n``say`` - say something on behalf of the bot\n``math`` - \n``hangman`` - guess the word game [Manage Messages permission required]\n\n__**Reaction commands:**__\n``hug`` ``pat`` ``slap``  ``cry``")
        embed.setColor(0xee82ee)
        message.channel.send(embed)
    
}
    if (message.content.startsWith(prefix + "ping")) {
      message.channel.send(`🏓 Pong! ${Math.round(client.ws.ping)} ms`)
    }
    if (message.author.bot || !message.guild || message.webhookID) return;
    if (!message.content.startsWith(prefix)) return;
  blacklist.findOne({ guildId: message.guild.id, id: message.author.id }, async (err, data) => {
    if (err) throw err;
    if (!data) {
        if (!message.guild) return;
        let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();
  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) {
     const check = await db1.findOne({Guild: message.guild.id})
      ////command.run(client, message, args)
      if (check) {
        if (check.Cmds.includes(command.name)) return message.channel.send('This command is disabled.')
        
       }
        if (message.content == `${prefix}command-disable command-disable` || message.content == `${prefix}cmd-d command-disable` || message.content == `${prefix}cmd-d help` || message.content == `${prefix}command-disable help`  || message.content == `${prefix}cmd-d command-enable`  || message.content == `${prefix}command-disable command-enable` || message.content == `${prefix}cmd-d command-reset` || message.content == `${prefix}command-disable command-reset`) return message.channel.send(":x: You cannot disable system commands.")
        command.run(client, message, args)
    }
    if (!command)
    return;
  } else {
message.react("❌")
  }})})
client.login('ODI4MzY1MTkyNzkzODE3MTA4.YGohNA.KC9qn4aWA3qHnr9kHUrRVIg8L-U');