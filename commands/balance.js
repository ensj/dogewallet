module.exports = {
	name: 'balance',
		cooldown: 5,
	description: 'Find out your balance!',
	aliases: ['bal'],
	execute(msg, args, block_io) {
		block_io.get_address_balance({'labels': `${msg.author.id}`}, (error, data) => {
			if(error) {
				console.log(`Error occurred: ${error.message}`);
				return msg.channel.send(`Error: ${error.message}`);
			}

			console.log(data);
			msg.reply(`\`\`\`Your available account balance is ${data.data.available_balance}.\nYour pending received balance is ${data.data.pending_received_balance}.\`\`\``);
		});
	},	
};