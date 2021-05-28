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

const addRole = (name, message) => {
	const role = message.guild.roles.cache.find((role) => role.name === name);
	const member = message.guild.members.cache.get(message.author.id);
	if (!role) {
		return;
	}
	member.roles.add(role);
};

const removeRole = (name, message) => {
	const role = message.guild.roles.cache.find((role) => role.name === name);
	const member = message.guild.members.cache.get(message.author.id);
	if (!role) {
		return;
	}
	member.roles.remove(role);
};

client.on('message', (message) => {
	if (!/^\s*bot\s\w+\s*$/i.test(message)) {
		return;
	}
	message.delete();
	if (message.content.match(/mostr/i)) {
		addRole('Eyes', message);
	}
	if (message.content.match(/escond/i)) {
		removeRole('Eyes', message);
	}
	if (message.content.match(/promov/i)) {
		addRole('King-Queen', message);
	}
	if (message.content.match(/rebaix/i)) {
		removeRole('King-Queen', message);
	}
});

client.login(TOKEN);
