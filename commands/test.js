'use strict';

var spawn = require('child_process').spawn;

module.exports = function(opts, binaryPath) {
    spawn(binaryPath + 'grunt', ['test'], {
      stdio: 'inherit'
  });
}

