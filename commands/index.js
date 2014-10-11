'use strict';

var fs = require('fs');
var path = require('path');
var Command = require('../command-model');
var extend = require('extend');

var commandFiles = fs.readdirSync(__dirname);

commandFiles.forEach(function(file) {
    var commandName = path.basename(file, '.js');
    if (commandName === 'index' || commandName === '.DS_Store') { 
        return;
    } else {
        var module = require('./' + file);
        var moduleName = 'cmd_' + commandName;
        var commandInstance = new Command(commandName);
        commandInstance = extend(commandInstance, module);
        
        exports[moduleName] = commandInstance;
    }
});

