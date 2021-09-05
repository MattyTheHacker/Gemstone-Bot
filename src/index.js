// Require base discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When client is ready, run this code once
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with client's token
client.login(token);