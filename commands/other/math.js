const { MessageEmbed } = require('discord.js')
const math = require('mathjs')
module.exports = {
    name: 'math',
    run: async (client, message, args) => {
        try {
            message.channel.send(
                new MessageEmbed()
                    .addField('Question', args.join(" "))
                    .addField('Solution', math.evaluate(args.join(" ")))
            )
        } catch (err) {
            message.channel.send(err)
        }
    }
}