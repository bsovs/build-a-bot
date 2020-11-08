const reply = require("../../services/reply");

module.exports = {
	name: 'ping',
	description: 'Check Bot ping!',
	execute(message) {
		const timeTaken = Date.now() - message.createdTimestamp;
		reply.basic(message, `Pong! This message had a latency of ${timeTaken}ms.`);
	}
};
