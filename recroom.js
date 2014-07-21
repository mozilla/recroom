#! /usr/bin/env node
'use strict';

var DEFAULT_PROJECT_NAME = 'recroom-app';
var VERSION = '0.0.1';

var chalk = require('chalk');
var nopt = require('nopt');
var shell = require('shelljs');
var spawn = require('child_process').spawn;

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
    return console.log(chalk.blue('Mozilla recroom, Version ' + VERSION));
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
    return banner();
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

    spawn('yo', ['recroom'], {
        stdio: 'inherit'
    }).unref();

    banner();
}

// Scaffold some things.
if (command === 'generate' || command === 'scaffold' || command === 'g') {
    if (['controller', 'model', 'page', 'view'].indexOf(
        opts.argv.remain[1]) === -1) {
        console.log(
            chalk.red('"' + opts.argv.remain[1] +
                      '" is not a valid scaffold type.')
        );

        return;
    }
    spawn('yo', ['recroom:' + opts.argv.remain[1],
                 opts.argv.remain.slice(2)], {
        stdio: 'inherit'
    }).unref();
}

// Pipe out to grunt (build, serve, test).
if (command === 'run' || command === 'serve') {
    // Pipe out to grunt watch:build -- this is the first step to running your
    // packaged app inside Desktop B2G.
    if (opts.app) {
        spawn('grunt', ['build'], {
            stdio: 'inherit'
        }).unref();
        spawn('grunt', ['watch:build'], {
            stdio: 'inherit'
        }).unref();
    } else {
        spawn('grunt', ['serve'], {
            stdio: 'inherit'
        }).unref();
    }
}
if (command === 'test') {
    spawn('grunt', ['test'], {
        stdio: 'inherit'
    }).unref();
}
