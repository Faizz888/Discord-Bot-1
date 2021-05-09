const gif = {dynamic:true, format:'png', size:1024};
const Discord = require('discord.js')

module.exports = {
    name: 'hug',
    run: async(client, message, args) => {
            var subreddits = ['https://media1.tenor.com/images/faf41fe56f60ad4e69e91302570e071d/tenor.gif?itemid=16141118',
            'https://data.whicdn.com/images/241295638/original.gif', 'https://data.whicdn.com/images/250693013/original.gif',
            'https://data.whicdn.com/images/218924967/original.gif', 'https://i.pinimg.com/originals/49/1d/38/491d3842a75df5160c51734b41ad41a3.gif']
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        const reason = args.slice(1).join(" ")
        const user = message.mentions.users.first()|| message.guild.members.cache.get(args[0]);
        const embed1 = new Discord.MessageEmbed()
        embed1.setTitle('Reaction: huggles')
        embed1.setDescription(`${message.author} hugs everyone!`)
        embed1.setImage(sub)
        embed1.setColor(0xee82ee)
        message.delete()
        if(!user) return message.channel.send(embed1)
        const embed2 = new Discord.MessageEmbed()
        //embed1.setTitle('Реакция: обнимашки')
        embed2.setDescription(`${message.author} needs huggles!`)
        embed2.setColor(0xee82ee)
        if(user.id == message.author.id)return message.channel.send(embed2);
        const embed = new Discord.MessageEmbed()
        embed.setTitle('Reaction: huggles')
        embed.setDescription(`${message.author} hugs ${user}`)
        if(reason) embed.setDescription(`${message.author} hugs ${user}, ${reason}`)
        embed.setImage(sub)
        embed.setColor(0xee82ee)
        message.delete()
        //embed.setFooter(client.user.tag,client.user.displayAvatarURL(gif))
        message.channel.send(embed)
        }

        // client.on('messageReactionAdd', async (reaction, user) => {
        //     if (!reaction.message.guild) return;
        //     if (user.bot) return;
        //     if (user.id === message.author.id) return;
        //     if (reaction.emoji.name === '💕') {
        //         const embed3 = new Discord.MessageEmbed()
        //         embed.setTitle('Реакция: обнимашки')
        //         embed3.setDescription(`${user} обнимает ${message.author}, 💕💕💕`)
        //         embed3.setImage(sub)
        //         embed3.setColor(0xee82ee)
        //         message.delete()
        //         message.channel.send(embed3)
        //         return
        //     }
        //})
    }
