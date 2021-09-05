module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		if (member.user.bot) return;

		const role = member.guild.roles.cache.find(r => r.name === 'News');
		member.roles.add(role);

		console.log('News role assigned.');
	},
};