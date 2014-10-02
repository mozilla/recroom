'use strict';

var fs = require('fs');
var path = require('path');

var commandFiles = fs.readdirSync(__dirname);


commandFiles.forEach(function(file) {
  var commandName = path.basename(file, '.js');
  if (commandName === "index") { return; }
  else {
    var module = require("./" + file);
    var moduleName = "cmd_" + commandName;
    exports[moduleName] = module;
  }
});

