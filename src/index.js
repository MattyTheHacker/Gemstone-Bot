// Require base discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When client is ready, run this code once
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	else if (commandName === 'server') {
		await interaction.reply('Server info.');
	}
	else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
	else if (commandName === 'makemember') {
		await interaction.reply('Made you a Member!');
	}
});

// Login to Discord with client's token
client.login(token);