'use strict';

var chalk = require('chalk');
var spawn = require('child_process').spawn;

module.exports = {
    name: 'generate',
    description: 'Scaffolds the files needed to create a component of your app (model/view/controller/page)',
    availableArguments: ['component', 'name'],
    aliases: ['g', 'scaffold'],
    availableComponents: ['controller', 'model', 'page', 'view'],
    run: function(opts) {
        if (this.availableComponents.indexOf(
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
