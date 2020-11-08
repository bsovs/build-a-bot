const reply = require("../../services/reply");
module.exports = {
	name: 'avatar',
	alias: ['icon', 'myIcon'],
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	execute(message) {
		if (!message.mentions.users.size) {
			return reply.basic(message, (`Your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`));
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`;
		});

		reply.basic(message, avatarList);
	}
};