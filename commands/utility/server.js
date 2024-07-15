const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('gives information about server'),
    async execute(interaction){
        await interaction.reply(`this server is ${interaction.guild.name} and is owned by ${interaction.guild.owner} and has ${interaction.guild.memberCount}.`)
    },
}