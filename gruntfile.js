'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['app/views/**'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['public/css/**/*.css'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
              script: 'server.js',
              options: {
                args: ['dev'],
                nodeArgs: ['--debug'],
                callback: function (nodemon) {
                  nodemon.on('log', function (event) {
                    console.log(event.colour);
                  });
                },
                env: {
                  PORT: '3000'
                },
                cwd: __dirname,
                ignore: ['node_modules/**'],
                ext: 'js',
                watch: ['server'],
                delay: 1000,
                legacyWatch: true
              }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', ['concurrent']);

};
