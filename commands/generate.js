'use strict';

var chalk = require('chalk');
var spawn = require('child_process').spawn;

module.exports = function(opts, binaryPath) {
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
}

