#! /usr/bin/env node
'use strict';

var VERSION = '0.1.4';

var chalk = require('chalk');
var nopt = require('nopt');
var shell = require('shelljs');

var opts = nopt({
    app: Boolean,
    banner: Boolean,
    help: Boolean,
    version: Boolean
}, {
    a: '--app', package: '--app',
    h: '--help',
    v: '--version'
});

var recroomCommands = require('./commands');
var banner = require('./banner');

// Display version information.
if (opts.version) {
    console.log(chalk.blue('Rec Room, Version ' + VERSION));
    process.exit();
}

// Show the Mozilla dino banner.
if (opts.banner) {
    banner();
    process.exit();
}

var commandName = opts.argv.remain[0];

var availableCommands = Object.keys(recroomCommands).map(function(key) { 
    var plusAliases = '';
    if (recroomCommands[key].aliases.length > 0) {
        plusAliases = '/' + recroomCommands[key].aliases.join('/');
    }
    return key.substring(4) + plusAliases;
});

function findCommand() {
    for (var key in recroomCommands) {
        var command = recroomCommands[key];

        if (commandName === command.name || command.aliases.indexOf(commandName) !== -1) {
            return command;
        }
    }
}

if (commandName === undefined) {
    console.log(
        chalk.red('No command specified. Available commands: ') +
        chalk.blue(availableCommands.join(', '))
    );
    shell.exit(1);
}

else {
    var command = findCommand();
    if (command) {
        command.run(opts);
    }
    else {
        console.log(
            chalk.red('"' + commandName + '" is not a recognized command. Available commands: ') +
            chalk.blue(availableCommands.join(', '))
        );
    }
}
