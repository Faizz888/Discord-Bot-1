module.exports = {
    name: 'lock',
    //category: 'Moderation',
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
        const role = message.guild.roles.cache.get('729094230424944682');

       // if (!args.length) return message.channel.send('``lock on or lock off``');

       // const query = args[0].toLowerCase();

        //const perms = role.permissions.toArray();
        
        await message.mentions.channels.forEach(async channel => {
            if (channel.name.startsWith('🔒')) return message.channel.send(`<#${channel.id}> is already locked.`)
            try {
                await channel.updateOverwrite(role, {
                    SEND_MESSAGES: false
                });
                message.channel.send(`<#${channel.id}> has been locked! 🔒`)
                await channel.setName(`🔒${channel.name}`)
            } catch (err) {
                console.log(err);
            }
        })
    } 
}