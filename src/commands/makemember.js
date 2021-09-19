const { SlashCommandBuilder } = require('@discordjs/builders');
const request = require('request-promise');
const cheerio = require('cheerio');
const tough = require('tough-cookie');

const { union_url, union_cookie } = require('../config.json');

const cookie = new tough.Cookie({
	key: '.ASPXAUTH',
	value: union_cookie,
	domain: 'www.guildofstudents.com',
});

const cookieJar = request.jar();
cookieJar.setCookie(cookie, 'https://www.guildofstudents.com');

const options = {
	uri: union_url,
	jar: cookieJar,
};

const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('makemember')
		.setDescription('Gives you the Member role when supplied with an appropriate Student ID.')
		.addStringOption(option =>
			option.setName('studentid')
				.setDescription('Your UoB Student ID')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		await wait(1000);

		const memberArray = this.getMembers();

		if ((await memberArray).includes(interaction.options.getString('studentid'))) {
			const role = interaction.member.guild.roles.cache.find(r => r.name === 'Member');
			await interaction.member.roles.add(role);

			await interaction.editReply({ content: 'Made you a Member!', ephemeral: true });
		}
		else {
			await interaction.editReply({ content: 'Invalid Student ID supplied. Please contact a Committee member.', ephemeral: true });
		}
	},
	async getMembers() {
		const result = await request.get(options);

		const memberArray = [];

		const $ = cheerio.load(result);
		$('#ctl00_Main_rptGroups_ctl05_gvMemberships > tbody > tr > td:nth-child(2)').each((index, element) => {
			memberArray[index] = $(element).text();
		});

		return memberArray;
	},
};