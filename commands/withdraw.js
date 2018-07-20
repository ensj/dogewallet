module.exports = {
	name: 'withdraw',
		cooldown: 5,
		guildOnly: true,
	description: 'Send money to other dogecoin wallets. Each send command has a network fee of 1 dogecoin.',
	args: true,
	usage: '[address] [amount]',
	execute(msg, args, block_io) {
		var amount = Number(args[1]);
		if(!Number.isInteger(amount)) return msg.reply('that\'s an invalid amount!');
		
		block_io.withdraw_from_labels(
			{'amounts': `${amount}`, 'from_labels': `${msg.author.id}`, 'to_addresses': `${args[0]}`}, 
			(error, data) => {
				if(error) {
					console.log(`\x1b[31mSend(${msg.author.username}): Error occurred: ${error.message}\x1b[0m`);
					return msg.channel.send(`Failed to send \`${amount}\` coin(s) from ${msg.author.username}'s account to ${args[0]}'.\nError: ${error.message}`);
				}

				console.log(`${msg.author.username} withdrew ${data.data.amount_withdrawn} to ${args[0]}.`);
				msg.channel.send(`\`${amount}\` coin(s) successfully sent to \`${args[0]}\` with a transaction fee of 1 coin!`);
			}
		);
	},	
};