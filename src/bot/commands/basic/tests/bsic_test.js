const reply = require("../../../services/reply");
const anon = require("../anon");
const avatar = require("../avatar");

const _ = require('lodash');
const assert = require('assert');
const chai = require('chai'),
    spies = require('chai-spies');
const should = chai.should();
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const spy = require("sinon/lib/sinon/spy");
const ping = require("../ping");
chai.should();
chai.use(sinonChai);
chai.use(spies);

//INIT CONSTANTS
let message, client;

describe('Basic Unit Tests', function () {

    beforeEach(function () {
        //refresh inputs
        chai.spy.restore();
        message = {channel: {send: null}, reply: null, delete: null};
        message.channel.send = (toSend) => toSend;
        message.reply = (toSend) => new Promise(resolve => resolve(toSend));
        message.delete = (toDelete) => toDelete;
    });

    describe('!anon', function () {

        beforeEach(function () {
            const testCommand = '!anon';
            message.content = testCommand;
            message.cleanContent = testCommand;
        });

        it('should return a message', function () {
            //INPUT
            const message_args = ['hello!', 'this', 'is', 'anon!'];

            //MOCK
            chai.spy.on(reply, 'basic');
            chai.spy.on(message, 'delete');

            //EXECUTE
            anon.execute(message, message_args);

            //OUTPUT
            expect(message.delete).to.have.been.called(1);
            expect(reply.basic).to.have.been.called(1);
            expect(reply.basic).to.have.been.called.with(message, 'hello! this is anon!');
        });
    });

    describe('!ping', function () {

        beforeEach(function () {
            const testCommand = '!ping';
            message.content = testCommand;
            message.cleanContent = testCommand;
        });

        it('should return a pong', function () {
            //INPUT
            const message_args = [];
            message.createdTimestamp = 100;
            const mockTime = 106004;
            const timeTaken = mockTime - message.createdTimestamp;

            //MOCK
            chai.spy.on(reply, 'basic');
            chai.spy.on(Date, 'now', () => mockTime);

            //EXECUTE
            ping.execute(message, message_args);

            //OUTPUT
            expect(reply.basic).to.have.been.called(1);
            expect(reply.basic).to.have.been.called.with(message, `Pong! This message had a latency of ${timeTaken}ms.`);
        });
    });

    describe('!avatar', function () {

        beforeEach(function () {
            const testCommand = '!avatar';
            message.content = testCommand;
            message.cleanContent = testCommand;
        });

        it('should return the users avatar', function () {
            //INPUT
            message.mentions = {users: {size: 0}};
            message.author = {};
            const mockedUrl = 'https://url_mocked';

            //MOCK
            chai.spy.on(reply, 'basic');
            chai.spy.on(message.author, 'displayAvatarURL', () => mockedUrl);

            //EXECUTE
            avatar.execute(message);

            //OUTPUT
            expect(reply.basic).to.have.been.called(1);
            expect(reply.basic).to.have.been.called.with(message, `Your avatar: ${mockedUrl}`);
        });

        it('should return the mentioned avatars', function () {
            //INPUT
            const user1 = {avatar: 'https://url_mocked_1', username: '123', displayAvatarURL: ()=>'https://url_mocked_1'};
            const user2 = {avatar: 'https://url_mocked_2', username: '321', displayAvatarURL: ()=>'https://url_mocked_2'};
            const mockedUsers = [user1, user2];
            mockedUsers.size = 2;

            message.mentions = {users: mockedUsers};
            message.author = {};

            //MOCK
            chai.spy.on(reply, 'basic');
            const output = [`${user1.username}'s avatar: ${user1.avatar}`,
                `${user2.username}'s avatar: ${user2.avatar}`];

            //EXECUTE
            avatar.execute(message);

            //OUTPUT
            expect(reply.basic).to.have.been.called(1);
            expect(reply.basic).to.have.been.called.with(message, output);
        });
    });
});