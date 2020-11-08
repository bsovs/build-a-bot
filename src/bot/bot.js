const Discord = require("discord.js");
const fs = require('fs');
const path = require('path');
const glob = require("glob");
const flagService = require('./services/flagService');
const {errorMessage} = require("./errors/errorHandler");
const {prefix} = require('../../config.json');

class Bot {

    constructor() {

    }

    start = () => {
        const client = this.getNewClient();

        return this.setupCommands()
            .then(setupValue => {
                client.commandList = setupValue.commandList;
                client.commands = setupValue.commands;

                return this.initBot(client);
            })
            .catch(err => {
                throw err
            });
    };

    getNewClient = () => new Discord.Client();

    setupCommands = () => {
        let commands = new Discord.Collection();
        return new Promise((resolve, reject) =>
            glob("./commands/*/*.js", {cwd: __dirname}, (err, commandFiles) => {
                if (err) reject(err);

                let _commandList = [];
                for (const file of commandFiles) {
                    const command = require(file);

                    console.log('Loaded Command:', command.name);

                    if (command.name && !command.excluded) {
                        commands.set(command.name.toLowerCase(), command);

                        if (command.hidden !== true) _commandList.push({
                            'name': command.name,
                            'description': command.description
                        });

                        const fullPathNames = file.split('/');
                        const fileName = fullPathNames.pop().slice(0, -3)
                        const dirName = path.join(__dirname, 'commands', fullPathNames.pop());
                        flagService.execute(dirName, `${fileName}_flags`)
                            .then(_flagBody => {
                                command.flagBody = _flagBody
                            })
                            .catch(_ => command.flagBody = {});
                    }
                }
                resolve({commands: commands, commandList: _commandList});
            })
        );
    };

    initBot = (client) => {
        return new Promise(resolve => {
            //on message do
            client.on("message", (message) => {
                if (message.author.bot) return;
                if (!message.content.startsWith(prefix)) return;

                const commandBody = message.content.slice(prefix.length);
                const args = commandBody.split(' ').filter(arg => arg !== '');
                const commandName = args.shift().toLowerCase();
                const command = client.commands.get(commandName) || client.commands.find(cmd =>
                    cmd.aliases && cmd.aliases.map(alias => alias.toLowerCase()).includes(commandName));

                if (command) {
                    try {
                        if (commandName === 'help') {
                            command.execute(message, client.commandList);
                        } else {
                            if (args.length < 1) {
                                command.execute(message, args);
                            } else {
                                flagService.checkFlags(message, args, command.flagBody, command, () => command.execute(message, args));
                            }
                        }
                    } catch (error) {
                        errorMessage(message, error);
                    }
                } else {
                    errorMessage(message, `That command does not exist. Use ${prefix}help to find a list of commands.`);
                }
            });
            client.on('ready', () => {
                console.log(`Logged in as ${client.user.tag}!`);
                resolve(client);
            });

            //Start bot
            client.login(process.env.BOT_TOKEN || require("../../config.json").BOT_TOKEN).catch(e => console.log(e));
        });
    };
}

module.exports = {
    Bot
}
