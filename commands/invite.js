module.exports = {
	name: "invite",
	description: "Makes the bot generate an invite link for itself.",
	execute(msg, args, block_io) {
		msg.client.generateInvite(['SEND_MESSAGES']).then(link => {
			msg.author.send(`Generated bot invite link: ${link}`);
			if(msg.channel.type == 'dm') return;
			msg.reply(`I've sent you a DM with an invite link!`);
		});
	}
};