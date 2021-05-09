const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'avatar',
    run: async (client, message, args) => {
        let user; 
        if ( message.mentions.members.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]).user;
        } else {
            user = message.author;
        }
        const avatar = user.displayAvatarURL({size: 4096, dynamic: true})
        const embed = new MessageEmbed()
        embed.setTitle(`${user.tag}'s avatar`)
        embed.setImage(avatar)
        embed.setColor(0xee82ee)
        message.channel.send(embed);
    }
}