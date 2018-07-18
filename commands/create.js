module.exports = {
	name: 'create',
		cooldown: 5,
	description: 'Create a new dogecoin wallet.',
	execute(msg, args, block_io) {
		block_io.get_new_address({'label': `${msg.author.id}`}, (error, data) => {
			if(error) {
				console.log(`\x1b[31mCreate(${msg.author.username}): Error occurred: ${error.message}\x1b[0m`);
				return msg.channel.send(`Failed to create user account for ${msg.author.username}.\nError: ${error.message}`);
			}

			msg.reply('an account has been created under your id!');
			console.log(`\x1b[32mAccount created for ${msg.author.username}\x1b[0m`);
		});
	},	
};