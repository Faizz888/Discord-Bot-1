const { hangman } = require("reconlx");

module.exports = {
    name: 'hangman',
    run: async (client, message, args) => {
// parameters
/**
 * @name hangman
 * @param {Object} options options
 * @param {String} [options.channelID] channel to send to (channel.id)
 * @param {any} [options.message] parameter used for message event
 * @param {String} [options.permission] required permission to use this command (optional); default set to everyone.
 * @param {String} [options.word] word that needed to be guessed
 * @param {any} [options.client] client used to defined Discord.Client
 */
if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

// making hangman
const hang = new hangman({
  message: message,
  word: args.slice(1).join(" "),
  client: client,
  channelID: channel.id,
});

// starting the game
hang.start();
    }
}