/*global exports:true, require:true */
module.exports = exports = function(grunt) {
    'use strict';

    var sourceFiles = [
        'Gruntfile.js',
        'recroom.js',
        'src/*.js',
        'test/**/test.*.js'
    ];

    grunt.initConfig({
        jscs: {
            source: sourceFiles
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            source: sourceFiles
        },
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

    grunt.registerTask('default', ['test']);
    grunt.registerTask('publish', ['shell:publishDocs']);
    grunt.registerTask('serve', ['shell:serveDocs']);
    grunt.registerTask('test', ['jshint', 'jscs']);
};
