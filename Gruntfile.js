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

        sass: {
            dist: {
                files: {
                    'dist/styles/app.css': 'app/styles/app.scss'
                }
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
                files: [ 'app/scripts/*.jsx', 'app/scripts/*.js' ],
                tasks: [ 'browserify' ]
            },
            sass: {
                files: [ 'app/styles/*.scss' ],
                tasks: [ 'sass' ]
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
            dist: {
                src: [ 'app/scripts/*.js', 'app/scripts/*.jsx' ],
                dest: 'dist/scripts/bundle.js',
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    transform: [ require('grunt-react').browserify ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', [        
        'browserify',
        'copy',
        'sass',
        'express:dev',
        'watch'
    ]);
};