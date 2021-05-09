module.exports = {
    name: 'unlock',
    //category: 'Moderation',
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
        const role = message.guild.roles.cache.get('729094230424944682');

       // if (!args.length) return message.channel.send('``lock on or lock off``');

       // const query = args[0].toLowerCase();

        //const perms = role.permissions.toArray();
        
        await message.mentions.channels.forEach(async channel => {
           // if (!channel.name.startsWith('🔒')) return message.channel.send(`<#${channel.id}> is not locked.`)
            try {
                await channel.updateOverwrite(role, {
                    SEND_MESSAGES: true
                });
                message.channel.send(`<#${channel.id}> has been unlocked! 🔓`)
                await channel.setName(channel.name.substring(1))
            } catch (err) {
                console.log(err);
            }
            
        })
    } 
}