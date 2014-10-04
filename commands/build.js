'use strict';

var spawn = require('child_process').spawn;

module.exports = {
    name: 'build',
    description: 'Builds the distributable version of your application into the /dist directory',
    run: function() {
        spawn(this.binaryPath + 'grunt', ['build'], {
            stdio: 'inherit'
        });
    }
};
