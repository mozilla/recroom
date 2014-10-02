'use strict';

var spawn = require('child_process').spawn;

module.exports = function(opts, binaryPath) {
    if (opts.app) {
        spawn(binaryPath + 'grunt', ['build'], {
            stdio: 'inherit'
        });
        spawn(binaryPath + 'grunt', ['watch:build'], {
            stdio: 'inherit'
        });
    } else {
        spawn(binaryPath + 'grunt', ['serve'], {
            stdio: 'inherit'
        });
    }
}

