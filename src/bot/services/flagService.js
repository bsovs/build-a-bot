const Discord = require("discord.js");
const reply = require('./reply');
const glob = require("glob");
const _ = require('lodash');
const {flags_strict} = require('../../../config.json')
const {ErrorHandler} = require("../errors/errorHandler");

module.exports = {
    excluded: true,
    name: 'flagService',
    description: 'Used to get command flags',
    prefix: '-',
    execute(currentDirectory, flagModuleName) {
        let flags = new Discord.Collection();
        return new Promise((resolve, reject) => {
            glob(`./${flagModuleName}/*.js`, {cwd: currentDirectory, absolute: true}, (err, flagFiles) => {
                if (err) reject(err);

                let flagList = [];
                for (const file of flagFiles) {
                    const flag = require(file);
                    console.log('Loaded Flag:', flag.name, 'in', flagModuleName);

                    if (flag.name) {
                        flags.set(flag.name, flag);
                        if (!flag.excluded) flagList.push({'name': flag.name, 'description': flag.description});
                    }
                }

                resolve({flags, flagList});
            });
        });
    },
    checkFlags(message, _args, flagBody, parent, callBack) {
        let args = _.clone(_args);

        if (args.length < 1) return callBack();

        const startsWithPrefix = args[0].startsWith(module.exports.prefix);
        const commandWithPrefix = args.shift().toLowerCase();
        let command = commandWithPrefix.slice(module.exports.prefix.length);
        const noCommandFound = !flagBody.flags.has(command) && command !== 'help';

        if (noCommandFound && startsWithPrefix) throw 'flag does not exist';
        else if (flagBody.flags.has(commandWithPrefix) && !startsWithPrefix && !flags_strict) command = commandWithPrefix;
        else if (noCommandFound) return callBack();

        try {
            if (command === 'help') {
                module.exports.help(message, flagBody.flagList);
            } else {
                args.shift();
                flagBody.flags.get(command).execute(message, args, parent);
            }
        } catch (error) {
            throw 'flag error -> ' + error;
        }
    },
    help(message, commands) {
        commands = commands.map(cmd => {
            return ({'name': `-${cmd.name}`, 'value': `${cmd.description}`})
        });
        reply.table(message, commands, false, 'Commands:');
    }
};
