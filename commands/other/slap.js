const Discord = require('discord.js')

module.exports = {
    name : 'slap',
    run : async(client, message, args) => {
       // if (message.content.startsWith(prefix + "slap")) {
            var subreddits = ['https://i.imgur.com/ZOW1oQK.gif', 'https://pa1.narvii.com/6725/dc998e617dd3ecc6280b7dfd9b6d2441d145500e_hq.gif',
        'https://i.gifer.com/embedded/download/UwmX.gif', 'https://i.imgur.com/l02LxsK.gif?noredirect', 'https://safebooru.org/images/1882/605143df221803e99f3b5423f1df4c8b76bd8ae9.gif?1964756']
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        const reason = args.slice(1).join(" ")
        const user = message.mentions.users.first()|| message.guild.members.cache.get(args[0]);
        const embed1 = new Discord.MessageEmbed()
        embed1.setTitle('Reaction: slap')
        embed1.setDescription(`${message.author} slaps everyone!`)
        embed1.setImage(sub)
        embed1.setColor(0xee82ee)
        message.delete()
        if(!user) return message.channel.send(embed1)
        const embed2 = new Discord.MessageEmbed()
        //embed1.setTitle('Реакция: обнимашки')
        embed2.setDescription(`${message.author} needs a slap!`)
        embed2.setColor(0xee82ee)
        if(user.id == message.author.id)return message.channel.send(embed2);
        const embed = new Discord.MessageEmbed()
        embed.setTitle('Reaction: slap')
        embed.setDescription(`${message.author} slaps ${user}`)
        if(reason) embed.setDescription(`${message.author} slaps ${user}, ${reason}`)
        embed.setImage(sub)
        embed.setColor(0xee82ee)
        message.delete()
        //embed.setFooter(client.user.tag,client.user.displayAvatarURL(gif))
        message.channel.send(embed)
}}