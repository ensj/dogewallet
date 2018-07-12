module.exports = {
	name: 'address',
		cooldown: 5,
	description: 'Find out the address of your account.',
	execute(msg, args, block_io) {
		block_io.get_address_by_label({'label': `${msg.author.id}`}, (error, data) => {
			if(error) {
				console.log(`\x1b[31mAddress(${msg.author.username}}): Error occurred: ${error.message}\x1b[0m`);
				return msg.channel.send(`Failed to fetch address for ${msg.author.username}.\nError: ${error.message}`);
			}

			msg.reply(`your address is: \"${data.data.address}\".`);
		});
	},	
};