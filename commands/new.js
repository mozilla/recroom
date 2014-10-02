'use strict';

var DEFAULT_PROJECT_NAME = 'recroom-app';

var chalk = require('chalk');
var shell = require('shelljs');
var banner = require('../banner');

module.exports = function(opts, binaryPath) {
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
}

