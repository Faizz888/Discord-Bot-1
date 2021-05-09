const { MessageEmbed } = require('discord.js')
const schema = require('../../models/command')

module.exports = {
    name: 'command-enable',
    aliases: ['cmd-e'],
    // category: 'Config',
    // usage: 'command-enable <название команды>',
    // roles: 'Администратор',
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        embed.setDescription('You have no permissions.')
        embed.setColor("RED")
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(embed)
        const cmd = args[0]
        if (!cmd) return message.channel.send("Specify command.")
        if (!!client.commands.get(cmd) === false) return message.channel.send('This command does not exist.');
        schema.findOne({Guild: message.guild.id}, async (err, data) => {
            if (err) throw err;
            if (data) {
                if (data.Cmds.includes(cmd)) {
                    let commandNumber;
                    for (let i = 0; i < data.Cmds.length; i++) {
                        if (data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                    }

                    await data.save()
                    await data.save()
                    message.channel.send(`:white_check_mark: Enabled '${cmd}'!`)
                } else return message.channel.send('This command is not disabled.')
            }
        })
    }
}