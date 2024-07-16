const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('gives info about you'),
    async execute(interaction, client) {
        await interaction.reply(`username is ${interaction.user.username}, join date is ${interaction.member.joinedAt}.`);
    },
};