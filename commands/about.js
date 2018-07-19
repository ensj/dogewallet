const { prefix } = require('../config.json');

module.exports = {
	name: 'about',
	description: 'About DogeWallet!',
	execute(msg, args, block_io) {
		msg.channel.send(`${msg.client.user} is a bot created by ensj. You can use this bot to create and maintain a dogecoin wallet associated with your discord account! Type **${prefix}help** to get started.`);
	}
};