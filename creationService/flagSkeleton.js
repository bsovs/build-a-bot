const flagSkeleton = (cmd) => `
const reply = require('../../../services/reply');

module.exports = {
    name: 'flag',
    alias: ['f', 'flg'],
    description: 'An example flag',
    execute(message, args, parent) {
        reply.basic(message, 'This is a flag for ${cmd}');
    }
};`;

module.exports = {
    flagSkeleton
}
