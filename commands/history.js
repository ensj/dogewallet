module.exports = {
	name: 'history',
		cooldown: 5,
	description: 'DMs you a list of your past 25 transactions.',
	args: true,
	usage: '[transaction type: SENT/RECEIVED]',
	execute(msg, args, block_io) {
		var type = args[0].toLowerCase();
		block_io.get_transactions({'type': `${type}`, 'labels': `${msg.author.id}`}, (error, data) => {
			if(error) {
				console.log(`\x1b[31mAddress(${msg.author.username}): Error occurred: ${error.message}\x1b[0m`);
				return msg.reply(`Failed to pull up user history!\nError: ${error.message}`);
			}

			var message = [];
			data.data.txs.forEach((transaction) => {
				if(type == 'received') {
					message.push(`Received ${transaction.amounts_received[0].amount} from ${transaction.senders[0]}.\n`);
				}else {
					message.push(`Sent ${transaction.amounts_sent[0].amount} to ${transaction.amounts_sent[0].recipient}.\n`);
				}
			});

			return msg.author.send(message)
			.then(() => {
				if(msg.channel.type == 'dm') return;
				msg.reply('I\'ve sent you a DM with your transaction history!');
			})
			.catch(error, () => {
				console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
				message.reply('It seems that I couldn\'t DM you! Do you have DMs disabled?');
			});
		});
	},	
};