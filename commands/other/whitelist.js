const { MessageEmbed } = require('discord.js')
const blacklist = require('../../models/blacklist')

module.exports = {
    name: 'whitelist',
    run: async (client, message, args) => {
        // let embed = new MessageEmbed()
        // embed.setDescription('У вас недостаточно прав.')
        // embed.setColor("RED")
        if (!message.member.hasPermission("MANAGE_ROLES")) return //message.channel.send(embed)
        const User = message.mentions.users.first()
        if (!User) return message.channel.send('Incorrectly specified.')

        blacklist.findOne({  guildId: message.guild.id, id: User.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
               await blacklist.findOneAndDelete({ guildId: message.guild.id, id: User.id })
               .catch(err => console.log(err))
               message.channel.send(`${User} has been removed from blacklist!`)
            } else {
                message.channel.send("This user is not blacklisted.")
            
            
            }})}}