const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('command name')
        .setDescription('command description'),
    async execute(interaction, client) {
        
    },
};