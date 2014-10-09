'use strict';

var spawn = require('child_process').spawn;

module.exports = {
    name: 'deploy',
    description: 'Builds and deploys your app to github pages',
    run: function() {
        spawn(this.binaryPath + 'grunt', ['deploy'], {
            stdio: 'inherit'
        });
    }
};

