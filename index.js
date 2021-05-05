require('dotenv').config();
const Discord = require('discord.js');
const TOKEN = process.env.TOKEN || '';
const client = new Discord.Client();
client.once('ready', () => {
	console.log('Running');
});
const getKeys = (obj) => {
	const res = [];
	for (let attr in obj) {
		if (typeof attr === 'string') {
			res.push(attr);
		}
	}
	return res.sort();
};
const regex = /^\s*bot\s\w+\s*$/i;
client.on('message', (message) => {
	if (!regex.test(message)) {
		return;
	}
	message.delete();
	const role = message.guild.roles.cache.find((role) => role.name === 'Eyes');
	if (!role) {
		return;
	}
	const member = message.guild.members.cache.get(message.author.id);
	if (!member) {
		return;
	}
	if (message.content.match(/mostr/i)) {
		member.roles.add(role);
	}
	if (message.content.match(/escond/i)) {
		member.roles.remove(role);
	}
});
client.login(TOKEN);
