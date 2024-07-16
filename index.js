const fs = require('node:fs')
const path = require('node:path')

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });


// initiate all commands from ./commands/*
client.commands = new Collection();

const foldersPath = path.join(__dirname,'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders){
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command){
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`failed to initiate command at ${filePath}`)
		}
	}
}


//command handler
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return

	const command = interaction.client.commands.get(interaction.commandName)
	if (!command) {
		console.error(`no command matching ${interaction.commandName}`)
	}

	try {
		await command.execute(interaction, client)
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'there was an error while executing this command...', ephemeral: true})
		}
		else {
			await interaction.reply({content: 'there was an error while executing this command...', ephemeral: true})
		}
	}

	console.log(interaction)

});




// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('error', (error) => {
	console.error('WebSocket error encountered:', error);
	// Implement retry logic or other error handling here
});

// Log in to Discord with your client's token
client.login(token);