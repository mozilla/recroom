#! /usr/bin/env node
'use strict';

var chalk = require('chalk');
var nopt = require('nopt');
var shell = require('shelljs');
var spawn = require('child_process').spawn;

// Thanks to @fwenzel for this one.
console.log(
    "\n",
    chalk.red("             _.-~-.\n"),
    chalk.red("           7''  Q..\n"),
    chalk.red("        _7         (_\n"),
    chalk.red("      _7  _/    _q.  /\n"),
    chalk.red("    _7 . ___  /VVvv-'_\n"),
    chalk.red("   7/ / /~- \\_\\      '-._     .-'                      /       //\n"),
    chalk.red("  ./ ( /-~-/||'=.__  '::. '-~'' {             ___   /  //     ./{\n"),
    chalk.red(" V   V-~-~| ||   __''_   ':::.   ''~-~.___.-'' _/  // / {_   /  {  /\n"),
    chalk.red("  VV/-~-~-|/ \\ .'__'. '.    '::                     "), chalk.white("_ _ _"), chalk.red("        ''.\n"),
    chalk.red("  / /~~~~||VVV/ /  \\ )  \\        "), chalk.white("_ __ ___   ___ ___(_) | | __ _"), chalk.red("   .::'\n"),
    chalk.red(" / (~-~-~\\.-' /    \\'   \\::::.  "), chalk.white("| '_ ` _ \\ / _ \\_  / | | |/ _` |"), chalk.red(" :::'\n"),
    chalk.red("/..\\    /..\\__/      '     '::: "), chalk.white("| | | | | | (_) / /| | | | (_| |"), chalk.red(" ::'\n"),
    chalk.red("vVVv    vVVv                 ': "), chalk.white("|_| |_| |_|\\___/___|_|_|_|\\__,_|"), chalk.red(" ''\n\n")
);

var opts = nopt({
    help: Boolean,
    version: Boolean
}, {
    h: '--help',
    v: '--version'
});

var command = opts.argv.remain[0];

// Create a new project and initialize an app using generator-recroom.
if (command === 'new') {
    var projectName = opts.argv.remain[1] || 'recroom-app';

    // Abort if this project already exists.
    if (shell.test('-e', projectName)) {
        console.log(
            chalk.red("\"" + projectName + "\" already exists in this directory. Aborting..."),
            chalk.yellow("\n\nPlease choose another project name.")
        );
        shell.exit(1);
    }

    shell.mkdir(projectName);

    shell.cd(projectName);

    spawn('yo', ['recroom'], {
        stdio: 'inherit'
    });
}
