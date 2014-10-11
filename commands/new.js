'use strict';

var DEFAULT_PROJECT_NAME = 'recroom-app';

var banner = require('../banner');
var chalk = require('chalk');
var shell = require('shelljs');
var spawn = require('child_process').spawn;
var semver = require('semver');

module.exports = {
    name: 'new',
    description: 'Creates a recroom project in a new folder.',
    availableArguments: ['app-name'],
    availableOptions: ['cordova'],
    aliases: ['create'],
    run: function(opts) {
        var projectName = opts.argv.remain[1] || DEFAULT_PROJECT_NAME;

        // Abort if this project already exists.
        if (shell.test('-e', projectName)) {
            console.log(
                chalk.red('"' + projectName +
                          '" already exists in this directory. Aborting...'),
                chalk.yellow('\n\nPlease choose another project name.')
            );
            shell.exit(1);
        }

        shell.mkdir(projectName);
        shell.cd(projectName);

        banner();

        console.log(
            chalk.blue('Creating your Rec Room project. This may take some time...')
        );

        var scaffoldCommand = this.binaryPath + 'yo recroom' +
                              ' --no-insight --no-update-notifier';

        // The --cordova argument allows users to create a cordova
        // structure afterward.
        if (opts.cordova) {
            // Check that cordova is installed
            if (shell.which('cordova')) {
                var cordovaVersion = shell.exec('cordova --version', {silent:true}).output;
                var cordovaIsRecent = semver.gte(cordovaVersion, '3.5.0-0.2.6');

                // Check that cordova is updated. See issue: https://github.com/mozilla/recroom/issues/22
                if (cordovaIsRecent) {
                    // Create the cordova app and directory structure.
                    scaffoldCommand += ' && cordova create --link-to dist dist-cordova ' +
                                       '-i com.yourcompany.yourface -n ' + projectName;
                } else {
                    console.log(
                        chalk.red('\nIt appears Cordova is out-of-date, which may cause problems building your application.'),
                        chalk.yellow('\nPlease try updating your Cordova installation with `npm update -g cordova`')
                    );
                    shell.exit(1);
                }
            } else {
                console.log(
                    chalk.red('\nCordova not found.'),
                    chalk.yellow('\nPlease install Cordova by running `npm install -g cordova`')
                );
                shell.exit(1);
            }
        }

        // TODO: Walk through commands in an array instead of relying on &&.
        shell.exec(scaffoldCommand);

        // Build the project so we have files in the /dist folder
        var buildProcess = spawn(this.binaryPath + 'grunt', ['build'], {
            stdio: 'inherit'
        });

        buildProcess.on('close', function(code) {
            if (code === 0) {
                console.log(
                    '\nProject "' + chalk.blue(projectName) + '" was created. Have fun!'
                );
            } else {
                console.log(
                    chalk.red('\nSomething went wrong while building your application.' +
                            'Try running `recroom build` from the root of your project.')
                );
            }
        });
    }
};
