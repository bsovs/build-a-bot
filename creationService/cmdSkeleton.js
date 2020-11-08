const cmdSkeleton = (cmd, description) => `const reply = require('../../services/reply');

module.exports = {

    name: '${cmd}',               
    description: '${description}',

    execute(message, args) {
        
\t\t// do stuff here
        // args is an array of words that came after the command ex. ['abc', '123']
        // message variable is used to get properties from the message. learn more at https://discord.js.org/#/docs/main/stable/class/Message
        
        reply.basic(message, 'Your message to display goes here' );
\t\t
\t\t//check out services/reply.js for list of available reply methods
    }
};
`;

module.exports = {
    cmdSkeleton
}