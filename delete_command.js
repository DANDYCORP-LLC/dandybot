const { REST, Routes } = require('discord.js');
const { clientID, guildID, token } = require('./config.json');


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

readline.question('enter command id:\n', id => {

    console.log(`attempting to delete ${id}`);

    const rest = new REST().setToken(token);


    // for guild-based commands
    rest.delete(Routes.applicationGuildCommand(clientID, guildID, id))
        .then(() => console.log(`command deleted for ${guildID}`))
        .catch(console.error);

    // for global commands
    rest.delete(Routes.applicationCommand(clientID, id))
        .then(() => console.log('command deleted globally'))
        .catch(console.error);

    
    readline.close();
});