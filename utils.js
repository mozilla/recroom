'use strict';

var fs = require('extfs');

module.exports = {
    // Check app for bower and npm dependencies
    checkForDeps: function(directories) {
        this.getToRoot();
        var dependenciesFound = true;

        directories.forEach(function(directory) {
            var empty = fs.isEmptySync(directory);
            if (empty === true) {
                dependenciesFound = false;
            }
        });

        return dependenciesFound;
    },

    // Travel to project root folder
    getToRoot: function() {
        var filesInWorkingDir = fs.readdirSync('./');
        var atProjectRoot = filesInWorkingDir.indexOf('package.json') !== -1;

        if (atProjectRoot) {
            return;
        } else {
            process.chdir('../');
            this.getToRoot();
        }
    }
};
