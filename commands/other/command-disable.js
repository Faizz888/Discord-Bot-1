const { MessageEmbed } = require('discord.js')
const schema = require('../../models/command')

module.exports = {
    name: 'command-disable',
    aliases: ['cmd-d'],
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
                if (data.Cmds.includes(cmd)) return message.channel.send("This command is already disabled.");
                data.Cmds.push(cmd)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Cmds: cmd
                })
            }
            await data.save();
            message.channel.send(`:white_check_mark: Command ${cmd} has been successfully disabled!`)
        })
    }
}