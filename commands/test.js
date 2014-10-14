'use strict';

var spawn = require('child_process').spawn;

module.exports = {
    name: 'test',
    description: 'Runs all unit tests in your application',
    run: function() {
        spawn(this.binaryPath + 'grunt', ['test'], {
            stdio: 'inherit'
        });
    }
};
