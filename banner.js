#! /usr/bin/env node
'use strict';

var chalk = require('chalk');

// Thanks to @fwenzel for this one.
module.exports = function() {
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
};
