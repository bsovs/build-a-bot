const reply = require("../src/bot/services/reply");
const help = require("../src/bot/commands/help/help");

const _ = require('lodash');
const assert = require('assert');
const chai = require('chai'),
    spies = require('chai-spies');
const should = chai.should();
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const spy = require("sinon/lib/sinon/spy");
chai.should();
chai.use(sinonChai);
chai.use(spies);

//INIT CONSTANTS
let message_mock, message, client;

describe('Run All Tests - Commands E2E', function () {

    //INIT SERVER
    before(() => {
        return new Promise((resolve) => {
            const {Bot} = require('../src/bot/bot');

            const bot = new Bot;

            chai.spy.on(bot, 'getNewClient');
            chai.spy.on(bot, 'setupCommands');
            chai.spy.on(bot, 'initBot');

            bot.start()
                .then(_client => {
                    expect(bot.getNewClient).to.have.been.called(1);
                    expect(bot.setupCommands).to.have.been.called(1);
                    expect(bot.initBot).to.have.been.called(1);

                    client = _.clone(_client);
                    message_mock = require('./message_mock');

                    resolve();
                })
                .catch(e => console.log(e));
        });
    });

    after(() => {
        client.destroy();
    });

    beforeEach(function () {
        //refresh inputs
        chai.spy.restore();
        message = _.cloneDeep(message_mock);
        message.channel.send = (toSend) => toSend;
        message.reply = (toSend) => new Promise(resolve => resolve(toSend));
    });

    describe('!help', function () {

        let botResponse = require('./table_mock');

        beforeEach(function () {
            const testCommand = '!help';
            message.content = testCommand;
            message.cleanContent = testCommand;
        });

        it('should return a table of available commands', function () {
            //INPUT

            //MOCK
            chai.spy.on(reply, 'table');
            chai.spy.on(message.channel, 'send');

            //EXECUTE
            client.emit("message", message)

            //OUTPUT
            expect(reply.table).to.have.been.called(1);
            expect(message.channel.send).to.have.been.called(1);
        });
    });

    describe('!ping', function () {

        let botResponse = require('./table_mock');

        beforeEach(function () {
            const testCommand = '!ping';
            message.content = testCommand;
            message.cleanContent = testCommand;
        });

        it('should return pong', function () {
            //INPUT

            //MOCK
            chai.spy.on(reply, 'basic');
            chai.spy.on(message.channel, 'send');

            //EXECUTE
            client.emit("message", message)

            //OUTPUT
            expect(reply.basic).to.have.been.called(1);
            expect(message.channel.send).to.have.been.called(1);
        });
    });
});