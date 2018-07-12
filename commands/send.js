module.exports = {
	name: 'send',
		cooldown: 5,
	description: 'Send money to stupid faggots! Fuck you!',
	args: true,
	usage: '[user] [amount]',
	execute(msg, args, block_io) {
		var taggedUser = msg.mentions.users.first();
		block_io.withdraw_from_addresses(
			{'amounts': `${args[1]}`, 'from_labels': `${msg.author.id}`, 'to_labels': `${taggedUser.id}`}, 
			(error, data) => {
				if(error) {
					console.log(error);
					return msg.reply(`Failed to send ${args[1]} to ${taggedUser.id}.\nError: ${error}`);
				}

				console.log(data);

			}
		);
	},	
};