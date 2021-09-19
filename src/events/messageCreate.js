module.exports = {
	name: 'messageCreate',
	async execute(message) {

		if (message.channel.name === 'introductions') {
			this.giveGuest(message);
		}
	},
	giveGuest(message) {
		console.log('Message detected in #introductions.');

		const filter = (reaction) => {
			return ['👋', '🐮'].includes(reaction.emoji.name);
		};

		const collector = message.createReactionCollector({ filter });

		collector.on('collect', (reaction, user) => {
			console.log(`Collected ${reaction.emoji.name} reacted to by ${user.username}`);

			const guildMember = message.guild.members.resolve(user.id);
			const guestRole = message.guild.roles.cache.find(r => r.name === 'Guest');

			if (guildMember.roles.cache.some(role => role.name === 'Committee')) {
				console.log('Reaction added by Committee.');
				message.member.roles.add(guestRole);
				collector.stop();
			}
			else {
				console.log('Reaction added by non-Committee');
			}
		});
		collector.on('end', () => console.log(`Added Guest role to ${message.member.user.username + '#' + message.member.user.discriminator}`));
	},
};