const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildId: String,
    id: String,
    Blocked: Array
})

module.exports = mongoose.model('blacklist', Schema)