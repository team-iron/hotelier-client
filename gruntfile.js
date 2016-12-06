'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        clean: ['build/'],

        jshint: {

            options: {
                  jshintrc: '.jshintrc',
                  ignores: ['node_modules/**']
            },
            source: {
                  files: {
                      src: ['src/js/**/*.js']
                  }
            }
        },

        copy: {
            html: {
                files: [
                    { expand: true, cwd: 'src/', src: 'index.html', dest: 'build/' }
                ]
            },
            vendorjs: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/angular/',
                    src: ['angular.js'],
                    dest: 'build/js/'
                }]
            }
        },
        concat: {
              js: {
                src: ['build/js/angular.js', 'src/js/hotelier.module.js', 'src/js/**/*.js'],
                dest: 'build/js/app.js'
              }
        },
        watch: {
            html: {
                files: ['src/index.html'],
                tasks: ['copy:html']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['test', 'concat']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', [ 'clean', 'test', 'copy', 'concat' ]);
};
