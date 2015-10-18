module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            },
            options: {
                port: 3000
            }
        },

        copy: {
            main: {
                files: [
                    // HTML
                    {
                        expand: true,
                        cwd: 'app/',
                        flatten: true,
                        src: ['*.html'],
                        dest: 'dist/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        watch: {
            react: {
                files: [ 'app/scripts/*.jsx' ],
                tasks: [ 'browserify' ]
            },
            express: {
                files:  [ '*.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    spawn: false
                }
            },
            options: {
                livereload: true
            }
        },

        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ]
            },
            client: {
                src: [ 'app/scripts/**/*.jsx' ],
                dest: 'dist/scripts/bundle.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', [        
        'browserify',
        'copy',
        'express:dev',
        'watch'
    ]);
};