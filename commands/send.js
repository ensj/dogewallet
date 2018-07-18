module.exports = {
	name: 'send',
		cooldown: 5,
		guildOnly: true,
	description: 'Send money to other users with wallets. Each send command has a network fee of 1 dogecoin.',
	args: true,
	usage: '[user] [amount]',
	execute(msg, args, block_io) {
		if(!Number.isInteger(args[1])) return msg.reply('that\'s an invalid amount!');
		
		var taggedUser = msg.mentions.users.first();
		block_io.withdraw_from_labels(
			{'amounts': `${args[1]}`, 'from_labels': `${msg.author.id}`, 'to_labels': `${taggedUser.id}`}, 
			(error, data) => {
				if(error) {
					console.log(`\x1b[31mSend(${msg.author.username}): Error occurred: ${error.message}\x1b[0m`);
					return msg.channel.send(`Failed to send \`${args[1]}\` coin(s) from ${msg.author.username}'s account to ${taggedUser.username}'s account.\nError: ${error.message}`);
				}

				console.log(`${msg.author.username} withdrew ${data.data.amount_withdrawn} to ${taggedUser.username}.`);
				msg.channel.send(`\`${args[1]}\` coin(s) successfully sent to ${taggedUser.username} with a transaction fee of 1 coin!`);
			}
		);
	},	
};