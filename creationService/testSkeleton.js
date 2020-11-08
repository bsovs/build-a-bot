const testSkeleton = (cmd) => `
const reply = require("../../../services/reply");
const ${cmd} = require("../${cmd}");

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
let message, client;

describe('${cmd} Unit Tests', function () {

    beforeEach(function () {
        //refresh inputs
        chai.spy.restore();

        message = {channel: {send: null}, reply: null, delete: null};
        message.channel.send = (toSend) => toSend;
        message.reply = (toSend) => new Promise(resolve => resolve(toSend));
        message.delete = (toDelete) => toDelete;

        const testCommand = '!${cmd}';
        message.content = testCommand;
        message.cleanContent = testCommand;
    });

    it('should return a message', function () {
        //INPUT
        const message_args = [];

        //MOCK
        chai.spy.on(reply, 'basic');

        //EXECUTE
        ${cmd}.execute(message, message_args);

        //OUTPUT
        expect(reply.basic).to.have.been.called(1);
        expect(reply.basic).to.have.been.called.with(message, 'Your message to display goes here');
    });
});`;

module.exports = {
    testSkeleton
}