module.exports = {
	name: 'balance',
		cooldown: 5,
	description: 'Find out your account balance!',
	aliases: ['bal'],
	execute(msg, args, block_io) {
		block_io.get_address_balance({'labels': `${msg.author.id}`}, (error, data) => {
			if(error) {
				console.log(`\x1b[31mBalance(${msg.author.username}): Error occurred: ${error.message}\x1b[0m`);
				return msg.channel.send(`Failed to fetch ${msg.author.username}'s account balance.\nError: ${error.message}`);
			}

			msg.reply(`\nYour available account balance is ${data.data.available_balance}.\nYour pending received balance is ${data.data.pending_received_balance}.`);
		});
	},	
};