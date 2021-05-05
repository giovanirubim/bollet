require('dotenv').config();
const http = require('http');
const Discord = require('discord.js');
const TOKEN = process.env.TOKEN || '';
const client = new Discord.Client();

let time = null;
const startServer = () => {
	http.createServer((req, res) => {
		const text = 'Running since: ' + time.toISOString();
		res.writeHead(200, {
			'content-type': 'text/plain',
			'content-length': text.length,
		});
		res.write(text);
		res.end();
	}).listen(process.env.PORT || 8080, () => {
		time = new Date();
		console.log('HTTP server started');
	});
};

client.once('ready', () => {
	console.log('Running');
	startServer();
});

client.on('message', (message) => {
	if (!/^\s*bot\s\w+\s*$/i.test(message)) {
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
