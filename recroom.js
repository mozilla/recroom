#! /usr/bin/env node
'use strict';

var DEFAULT_PROJECT_NAME = 'recroom-app';
var VERSION = '0.1.4';

var chalk = require('chalk');
var nopt = require('nopt');
var shell = require('shelljs');
var spawn = require('child_process').spawn;

var binaryPath = __dirname + '/node_modules/.bin/';

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

// Display version information.
if (opts.version) {
    console.log(chalk.blue('Rec Room, Version ' + VERSION));
    process.exit();
}

// Thanks to @fwenzel for this one.
function banner() {
    console.log(
        "\n",
        chalk.red("             _.-~-.\n"),
        chalk.red("           7''  Q..\\\n"),
        chalk.red("        _7         (_\n"),
        chalk.red("      _7  _/    _q.  /\n"),
        chalk.red("    _7 . ___  /VVvv-'_\n"),
        chalk.red("   7/ / /~- \\_\\      '-._     .-'                      /       //\n"),
        chalk.red("  ./ ( /-~-/||'=.__  '::. '-~'' {             ___   /  //     ./{\n"),
        chalk.red(" V   V-~-~| ||   __''_   ':::.   ''~-~.___.-'' _/  // / {_   /  {  /\n"),
        chalk.red("  VV/-~-~-|/ \\ .'__'. '.    '::                    "), chalk.white("_ _ _"), chalk.red("       ''.\n"),
        chalk.red("  / /~~~~||VVV/ /  \\ )  \\       "), chalk.white("_ __ ___   ___ ___(_) | | __ _"), chalk.red("  .::'\n"),
        chalk.red(" / (~-~-~\\.-' /    \\'   \\::::. "), chalk.white("| '_ ` _ \\ / _ \\_  / | | |/ _` |"), chalk.red(":::'\n"),
        chalk.red("/..\\    /..\\__/      '     ':::"), chalk.white("| | | | | | (_) / /| | | | (_| |"), chalk.red("::'\n"),
        chalk.red("vVVv    vVVv                 ':"), chalk.white("|_| |_| |_|\\___/___|_|_|_|\\__,_|"), chalk.red("''\n\n")
    );
}

var command = opts.argv.remain[0];

// Show the Mozilla dino banner.
if (opts.banner) {
    banner();
    process.exit();
}

if (command === undefined) {
     console.log(
         chalk.red('No command specified. Available commands: ') +
         chalk.blue('new/create, generate/g/scaffold, deploy, serve, run')
    );
    shell.exit(1);
}

// Create a new project and initialize an app using generator-recroom.
if (command === 'new' || command === 'create') {
    var projectName = opts.argv.remain[1] || DEFAULT_PROJECT_NAME;

    // Abort if this project already exists.
    if (shell.test('-e', projectName)) {
        console.log(
            chalk.red('"' + projectName +
                      '" already exists in this directory. Aborting...'),
            chalk.yellow("\n\nPlease choose another project name.")
        );
        shell.exit(1);
    }

    shell.mkdir(projectName);
    shell.cd(projectName);

    banner();

    var scaffoldCommand = binaryPath + 'yo recroom' +
                          ' --no-insight --no-update-notifier';

    // The --cordova argument allows users to create a cordova
    // structure afterward.
    if (opts.cordova && shell.which('cordova')) {
        // Create the cordova app and directory structure.
        scaffoldCommand += ' && cordova create --link-to dist dist-cordova ' +
                           '-i com.yourcompany.yourface -n ' + projectName;
    }

    console.log(
        chalk.blue('Creating your Rec Room project. This may take some time...')
    );

    // TODO: Walk through commands in an array instead of relying on &&.
    shell.exec(scaffoldCommand);

    console.log(
        'Project "' + chalk.blue(projectName) + '" was created. Have fun!'
    );
} else if (command === 'generate' || command === 'scaffold' ||
           command === 'g') { // Scaffold some things.
    if (['controller', 'model', 'page', 'view'].indexOf(
        opts.argv.remain[1]) === -1) {
        console.log(
            chalk.red('"' + opts.argv.remain[1] +
                      '" is not a valid scaffold type.')
        );

        process.exit();
    }
    spawn(binaryPath + 'yo', ['recroom:' + opts.argv.remain[1],
                 opts.argv.remain.slice(2)], {
        stdio: 'inherit'
    });
} else if (command === 'build') {
    spawn(binaryPath + 'grunt', ['build'], {
        stdio: 'inherit'
    });
} else if (command === 'deploy') {
    spawn(binaryPath + 'grunt', ['deploy'], {
        stdio: 'inherit'
    });
} else if (command === 'run' || command === 'serve') { // Pipe out to grunt
                                                       // (build, serve, test).
    // Pipe out to grunt watch:build -- this is the first step to running your
    // packaged app inside Desktop B2G.
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
} else if (command === 'test') {
    spawn(binaryPath + 'grunt', ['test'], {
        stdio: 'inherit'
    });
} else {
    console.log(
        chalk.red('"' + command + '" is not a recognized command.')
    );
}
