const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pings dandybot'),
    async execute(interaction, client) {
        await interaction.reply(`${client.ws.ping}ms`);
    },
};
