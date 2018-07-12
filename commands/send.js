module.exports = {
	name: 'send',
		cooldown: 5,
	description: 'Send money to stupid faggots! Fuck you!',
	execute(msg, args, block_io) {
		block_io.get_new_address({'label': `${msg.author.id}`}, (error, data) => {
			
		});
	},	
};