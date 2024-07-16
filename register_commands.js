const { REST, Routes } = require('discord.js')
const { clientID, guildID, token } = require('./config.json')
const fs = require('node:fs')
const path = require('node:path')



const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
        } else {
            console.log(`the command file ${filePath} returned invalid values`)
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`started refreshing ${commands.length} commands`);

		const data = await rest.put(
			//Routes.applicationGuildCommands(clientID, guildID), 
            Routes.applicationCommands(clientID),
			
            { body: commands },
		);

		console.log(`reloaded ${data.length} commands.`);
	} catch (error) {
		console.error(error);
	}
})();