const Discord = require('discord.js')

module.exports = {
    name : 'pat',
    run : async(client, message, args) => {
        var subreddits = ['https://i.imgur.com/sLwoifL.gif?noredirect', 'https://i.gifer.com/H69F.gif', 'https://thumbs.gfycat.com/TautInformalIndianjackal-small.gif']
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        const reason = args.slice(1).join(" ")
        const user = message.mentions.users.first()|| message.guild.members.cache.get(args[0]);
        const embed1 = new Discord.MessageEmbed()
        embed1.setTitle('Reaction: pat')
        embed1.setDescription(`${message.author} pats everyone!`)
        embed1.setImage(sub)
        embed1.setColor(0xee82ee)
        if(!user) return message.channel.send(embed1)

        // const embed2 = new Discord.MessageEmbed()
        //     embed2.setDescription(`Somebody, pat ${message.author}!`)
        //     embed2.setColor(0xee82ee)
        //     message.channel.send(embed2).then(function(patmsg) { patmsg.react('❤')})
        // client.on('messageReactionAdd', async (reaction, user) => {
            
        //     //if (reaction.message.partial) await reaction.message.fetch();
        //     //if (reaction.partial) await reaction.fetch();
        //     if (!reaction.message.guild) return;
        //     if (user.bot) return;
        //     if (reaction.emoji.name === '❤' || user.id === message.author.id) {
        //         const embed3 = new Discord.MessageEmbed()
        //         embed3.setDescription(`${user.tag} pat ${message.author}`)
        //         message.channel.send(embed3)
        //         return
        //     }
            
            
        //embed1.setTitle('Реакция: обнимашки')
        
        // if(user.id == message.author.id)return message.channel.send(embed2).then(patmsg => {
        //     const reasonFilter = (reaction/*, user*/) => {
        //         return ['❤'].includes(reaction.emoji.name)// && user.id !== message.author.id;
        //     };

        //     patmsg.react("❤")
        //         .then(() => {
        //             patmsg.awaitReactions(reasonFilter, { max: 1, time: 120000 }).then(collected => {
        //                 const cc = collected.first()
        //                 if (cc.emoji.name == '❤') {
        //                     message.channel.send(`worked\n${user.username} pat ${message.author}`)
        //                     return
        //                 }
        //             })
                
                        
                    
        const embed = new Discord.MessageEmbed()
        embed.setTitle('Reaction: pat')
        embed.setDescription(`${message.author} pats ${user}!`)
        if(reason) embed.setDescription(`${message.author} pats ${user}, ${reason}`)
        embed.setImage(sub)
        embed.setColor(0xee82ee)
        message.delete()
        //embed.setFooter(client.user.tag,client.user.displayAvatarURL(gif))
        message.channel.send(embed)//.then(msg=> msg.react('💕'));
        }}
