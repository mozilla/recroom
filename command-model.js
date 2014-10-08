'use strict';

module.exports = Command;

function Command(name) {
    this.binaryPath = __dirname + '/node_modules/.bin/';
    this.aliases = this.aliases || [];
    this.availableArguments = this.availableArguments || [];
    this.options = this.options || [];
}

Command.prototype.description = null;
Command.prototype.run = function() {
    throw new Error('Command does not have a `run` method.');
}
