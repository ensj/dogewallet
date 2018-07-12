
const fs = require('fs');
const {prefix, token} = require('./config.json');

const BlockIo = require('block_io');
const SECRETPIN = 'jhl981202';
const DOGEKEY = 'd848-de89-c3cd-f1eb';
const version = 2;
const block_io = new BlockIo(DOGEKEY, SECRETPIN, version);

const discord = require('discord.js');
const client = new discord.Client();
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

const cooldowns = new discord.Collection();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('error', console.error);

client.on('message', msg => {
	if(!msg.content.startsWith(`${prefix}`) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) return;

	if(command.guildOnly && msg.channel.type != 'text') {
		return msg.reply('This command can\'t be executed in DMs!');
	}

	if(command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${msg.author}.`;

		if(command.usage) {
			reply += `\nThe proper usage would be: \'${prefix}${commandName} ${command.usage}\'.`;

			return msg.channel.send(reply);
		}
	}

	if(!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if(!timestamps.has(msg.author.id)) {
		timestamps.set(msg.author.id, now);
		setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
	}else {
		const experationTime = timestamps.get(msg.author.id) + cooldownAmount;

		if(now < experationTime) {
			const timeLeft = (experationTime - now)/1000;
			return msg.reply(`Please wait ${timeLeft} more second(s) before reusing ${command.name}`);
		}

		timestamps.set(msg.author.id, now);
		setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
	}

	try {
		command.execute(msg, args, block_io);
	}catch(error) {
		console.error(error);
		msg.reply('There was an error executing that command!');
	}
});

client.login(token);