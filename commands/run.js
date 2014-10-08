'use strict';

var chalk = require('chalk');
var shell = require('shelljs');
var spawn = require('child_process').spawn;
var util = require('../utils');

module.exports = {
    name: 'run',
    description: 'Builds your app and runs the distributable version on port 9000',
    aliases: ['serve'],
    run: function(opts) {
        var dependenciesExist = util.checkForDeps([
            'app/bower_components', 'node_modules'
        ]);
        if (dependenciesExist === true) {
            if (opts.app) {
                spawn(this.binaryPath + 'grunt', ['build'], {
                    stdio: 'inherit'
                });
                spawn(this.binaryPath + 'grunt', ['watch:build'], {
                    stdio: 'inherit'
                });
            } else {
                spawn(this.binaryPath + 'grunt', ['serve'], {
                    stdio: 'inherit'
                });
            }
        } else {
            console.log(
                chalk.red('Warning: Some project dependencies are missing. Aborting...') +
                chalk.yellow('\nTry running `bower install && npm install` from the root of your project.')
            );
            shell.exit(1);
        }
    }
};
