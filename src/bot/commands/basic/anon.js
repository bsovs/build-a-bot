const reply = require('../../services/reply');

module.exports = {
	name: 'anon',
	description: 'Send anonymous messages',
	execute(message, args) {
		message.delete();
		reply.basic(message, args.join(' '));
	}
};