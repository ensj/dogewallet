module.exports = {
	name: 'history',
		cooldown: 5,
	description: 'DMs you a list of your past 25 transactions.',
	execute(msg, args, block_io) {
		var label;
		if(!args.length) {
			label = msg.author;
		}else {
			label = msg.mentions.users.first();
		}

		/*block_io.get_transactions({'label': `${label.id}`}, (error, data) => {
			if(error) {
				console.log(`\x1b[31mAddress(${msg.author.username}): Error occurred: ${error.message}\x1b[0m`);
				return msg.channel.send(`Failed to fetch address for ${msg.author.username}.\nError: ${error.message}`);
			}

			msg.reply(`${label.username}'s address is: \"${data.data.address}\".`);
		});*/
	},	
};