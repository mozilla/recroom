'use strict';

var chalk = require('chalk');
var recroomCommands = require('./commands');
var _ = require('underscore');

module.exports = {

    // Builds and logs help for a specific command
    printCommandHelp: function(command) {
        var configs = this.formatProps(command);

        var syntax = chalk.white('\nrecroom ' + command.name) +
                                                configs.availableArguments +
                                                configs.availableOptions;
        var description = chalk.white('\n' + command.description);
        var commandOptions = configs.optionDescriptions || '';
        
        console.log(syntax,
                    description, 
                    configs.aliases,
                    commandOptions,
                    '\n'
        );
    },

    // Formats command arguments, aliases and options for display
    formatProps: function(command) {
        var self = this;
        var configs = _(command).pick('availableArguments', 'availableOptions', 'aliases');
        var formattedConfigs = {};

        _(configs).each(function(value, key) {
            var formattedValue = '';
            if (value.length > 0) {
                switch (key) {
                    case 'availableArguments':
                        formattedValue = chalk.yellow(' <' + value.join('> <') + '> ');
                        break;
                    case 'availableOptions':
                        formattedValue = chalk.blue('<options>');
                        formattedConfigs.optionDescriptions = self.listCommandOptions(value);
                        break;
                    case 'aliases':
                        formattedValue = chalk.gray('\naliases: ' + value.join(', '));
                        break;
                }
            }

            formattedConfigs[key] = formattedValue;
        });  
        
        return formattedConfigs;
    },

    // Formats command options with descriptions for display
    listCommandOptions: function(availableOptions) {
        var formattedOptions = '\n';

        _(availableOptions).each(function(option) {
            formattedOptions += chalk.blue('\n  --' + 
                                option.name + ' | ' + 
                                option.description);
        });

        return formattedOptions;
    },

    // Logs help info for all commands or an explicitly specified command
    showHelpInfo: function(commandName) {
        if (commandName && recroomCommands['cmd_' + commandName]) {
            this.printCommandHelp(recroomCommands['cmd_' + commandName]);
        }
        else {
            console.log('usage: recroom <command> [args]',
                        chalk.yellow('\nAvailable Commands:')
            );
            for (var key in recroomCommands) {
                var command = recroomCommands[key];
                this.printCommandHelp(command);
            }
        }
    }


};
