module.exports = {
	name: 'create',
		cooldown: 5,
	description: 'Create a new dogecoin wallet, hekin wow!',
	execute(msg, args, block_io) {
		block_io.get_new_address({'label': `${msg.author.id}`}, (error, data) => {
			if(error) {
				console.log(`Error occurred: ${error.message}`);
				return msg.channel.send(`Error: ${error.message}`);
			}

			msg.reply('an account has been created under your id!');
			console.log(`Account created for ${msg.author.username}`);
		});
	},	
};