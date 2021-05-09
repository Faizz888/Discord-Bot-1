const Discord = require('discord.js')

module.exports = {
    name : 'cry',
    description: 'Заплакать',
    category: 'Развлечение',
    usage: 'cry [@member]',
    aliases: ['плач'],

    run : async(client, message, args) => {
//if (message.content.startsWith(prefix + "cry")) {
    var subreddits = ['https://i.pinimg.com/originals/c4/f4/f3/c4f4f3cc3379f35c1ad494abbfd1e57c.gif', 'https://data.whicdn.com/images/126334883/original.gif',
'https://3.bp.blogspot.com/-Kexb8UCtjiI/VyFYa2F86aI/AAAAAAAABbM/wbIZUT_ROUcG4sPTL5PshNmUARFCcIJPwCLcB/s1600/tumblr_meybc7zT3y1rkmjjzo1_500.gif',
'https://cdn130.picsart.com/253064933013202.gif']
var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
const reason = args.slice(1).join(" ")
const user = message.mentions.users.first()|| message.guild.members.cache.get(args[0]);
const embed1 = new Discord.MessageEmbed()
embed1.setTitle('Reaction: cry')
embed1.setDescription(`${message.author}'s crying`)
if (reason) embed1.setDescription(`${message.author}'s crying, ${reason}`)
embed1.setImage(sub)
embed1.setColor(0x00008b)
message.delete()
if(!user) return message.channel.send(embed1)
// const embed2 = new Discord.MessageEmbed()
// //embed1.setTitle('Реакция: обнимашки')
// embed2.setDescription(`${message.author} нужны поцелуйчики!`)
// embed2.setColor(0xee82ee)
if(user.id == message.author.id)return message.channel.send(embed1);
const embed = new Discord.MessageEmbed()
embed.setTitle('Reaction: cry')
embed.setDescription(`${message.author}'s crying because of ${user}!`)
if(reason) embed.setDescription(`${message.author}'s crying because of ${user}, ${reason}`)
embed.setImage(sub)
embed.setColor(0x00008b)
//embed.setFooter(client.user.tag,client.user.displayAvatarURL(gif))
message.delete()
message.channel.send(embed)
}}