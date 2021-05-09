const { MessageEmbed } = require('discord.js')
const blacklist = require('../../models/blacklist')

module.exports = {
    name: 'blacklist',
    run: async (client, message, args) => {
        // let embed = new MessageEmbed()
        // embed.setDescription('У вас недостаточно прав.')
        // embed.setColor("RED")
        if (!message.member.hasPermission("MANAGE_ROLES")) return //message.channel.send(embed)
        const User = message.mentions.users.first()
        if (!User) return message.channel.send('Incorrectly specified.')
        if (User.id == '640889847866851329') return;

        blacklist.findOne({ guildId: message.guild.id, id: User.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                return message.channel.send('This user is already blacklisted.')
            } else {
                data = new blacklist({ guildId: message.guild.id, id: User.id })
                data.save()
                .catch(err => console.log(err))
                let embed1 = new MessageEmbed()
                .setDescription(`Access to user ${User} has been successfully denied.`)
                .setColor("GREEN")
                message.channel.send(embed1)
            }
            
        })
    }
}