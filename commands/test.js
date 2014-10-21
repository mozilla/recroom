'use strict';

var chalk = require('chalk');
var shell = require('shelljs');
var spawn = require('child_process').spawn;
var util = require('../utils');

module.exports = {
    name: 'test',
    description: 'Runs all unit tests in your application',
    run: function() {
        var dependenciesExist = util.checkForDeps([
            'test/bower_components'
        ]);
        if (dependenciesExist === true) {
            spawn(this.binaryPath + 'grunt', ['test'], {
                stdio: 'inherit'
            });
        } else {
            console.log(
                chalk.red('Warning: Test dependencies are missing.') +
                chalk.yellow('\nTry running `bower install` from the test directory of your application.')
            );
            shell.exit(1);
        }
    }
};
