/*global exports:true, require:true */
module.exports = exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        shell: {
            publishDocs: {
                options: {
                    stdout: true
                },
                command: 'rake publish ALLOW_DIRTY=true'
            },
            serveDocs: {
                options: {
                    stdout: true
                },
                command: 'bundle exec middleman server'
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('publish', ['shell:publishDocs']);
    grunt.registerTask('serve', ['shell:serveDocs']);
};
