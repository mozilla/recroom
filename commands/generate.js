'use strict';

var chalk = require('chalk');
var spawn = require('child_process').spawn;

module.exports = {
    name: 'generate',
    description: 'Creates a recroom project in a new folder.',
    availableArguments: ['page', 'controller', 'model', 'route', 'view'],
    aliases: ['g', 'scaffold'],
    run: function(opts) {
        if (['controller', 'model', 'page', 'view'].indexOf(
            opts.argv.remain[1]) === -1) {
            console.log(
                chalk.red('"' + opts.argv.remain[1] +
                        '" is not a valid scaffold type.')
            );
            process.exit();
        }

        spawn(this.binaryPath + 'yo', ['recroom:' + opts.argv.remain[1],
        opts.argv.remain.slice(2)], {
            stdio: 'inherit'
        });
    }
};
