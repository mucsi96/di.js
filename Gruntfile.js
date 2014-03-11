module.exports = function(grunt) {

    var src = ['src/**/*.js','example/**/*.js'],
        specs = ['specs/**/*.js','example/**/*Spec.js'],
        all = src.concat(specs);

    grunt.initConfig(
        {
            jasmine: {
                default: {
                    src: src,
                    options: {
                        specs: specs,
                        junit: {
                            path: 'reports',
                            consolidate: true
                        },
                        keepRunner: true
                    }
                }
            },
            jslint: {
                default: {
                    src: all,
                    exclude: [],
                    directives: {
                        sloppy: true,
                        browser: true,
                        predef: [
                            'console','describe','it','runs','waitsFor','xdescribe','xit','spyOn','jasmine','expect','beforeEach','afterEach'
                        ]
                    }
                }
            },
            watch: {
                js: {
                    files: all,
                    tasks: ['jslint', 'jasmine']
                }
            },
            jsdoc : {
                dist : {
                    src: src,
                    options: {
                        destination: 'doc'
                    }
                }
            },
            exec: {
                remove_docs: {
                    command: 'del README.md'
                },
                generate_docs: {
                    command: 'jsdox --output . src/di.js',
                    stdout: true
                },
                rename_docs: {
                    command: 'rename di.md README.md'
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-exec');


    grunt.registerTask('default', ['jslint','jasmine', 'exec']);
};