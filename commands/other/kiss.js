const Discord = require('discord.js')

module.exports = {
    name: 'kiss',
    run: async(client, message, args) => {
var subreddits = ['https://im0-tub-kz.yandex.net/i?id=076749cde2c985c7a479bbe74cbc911e&n=13', 
    'https://cutewallpaper.org/21/anime-kisses/Romantic-Anime-Kiss-GIF-by-Reactions.gif', 'https://media1.tenor.com/images/277a4c25211b345968e90d39d35b05af/tenor.gif?itemid=17842237',
'https://cdn-nus-1.pinme.ru/tumb/600/photo/d6/5317/d653178492f95ad97011052d36549dcb.gif', 'http://pa1.narvii.com/6408/a1703f93ce68fff178cbef9400d76671eeeb7cd8_00.gif']
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        const reason = args.slice(1).join(" ")
        const user = message.mentions.users.first()|| message.guild.members.cache.get(args[0]);
        const embed1 = new Discord.MessageEmbed()
        embed1.setTitle('Reaction: kisses')
        embed1.setDescription(`${message.author} kisses everyone!`)
        embed1.setImage(sub)
        embed1.setColor(0xee82ee)
        message.delete()
        if(!user) return message.channel.send(embed1)
        const embed2 = new Discord.MessageEmbed()
        //embed1.setTitle('Реакция: обнимашки')
        embed2.setDescription(`${message.author} needs kisses!`)
        embed2.setColor(0xee82ee)
        if(user.id == message.author.id)return message.channel.send(embed2);
        const embed = new Discord.MessageEmbed()
        embed.setTitle('Reaction: kisses')
        embed.setDescription(`${message.author} kisses ${user}`)
        if(reason) embed.setDescription(`${message.author} kisses ${user}, ${reason}`)
        embed.setImage(sub)
        embed.setColor(0xee82ee)
        message.delete()
        //embed.setFooter(client.user.tag,client.user.displayAvatarURL(gif))
        message.channel.send(embed)
        }
    }