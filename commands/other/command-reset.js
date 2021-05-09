const { MessageEmbed } = require('discord.js')
const schema = require('../../models/command')

module.exports = {
    name: 'command-reset',
    aliases: ['cmd-r'],
    // category: 'Config',
    // description: "Включить все выключенные команды",
    // usage: "command-reset",
    // roles: 'Администратор',
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        embed.setDescription('You have no permissions.')
        embed.setColor("RED")
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(embed)
        const cmd = args[0]
       // if (!cmd) return message.channel.send("Укажите команду.")
       // if (!!client.commands.get(cmd) === false) return message.channel.send('Такой команды не существует.');
        schema.findOne({Guild: message.guild.id}, async (err, data) => {
            if (err) throw err;
            if (data) {
                await schema.findOneAndDelete({ Guild: message.guild.id })
                  await message.channel.send(`:white_check_mark: All the commands have been enabled!`)
                } else return message.channel.send('There are no disabled commands.')
            }
        )}
    }