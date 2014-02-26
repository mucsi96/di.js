module.exports = function(grunt) {

    grunt.initConfig(
        {
            jasmine: {
                default: {
                    src: ['src/**/*.js'],
                    options: {
                        specs: ['specs/**/*.js'],
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
                    src: [
                        'specs/**/*.js',
                        'src/**/*.js'
                    ],
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
                    files: ['specs/**/*.js','src/**/*.js'],
                    tasks: ['jslint', 'jasmine']
                }
            },
            jsdoc : {
                dist : {
                    src: 'src/**/*.js',
                    options: {
                        destination: 'doc'
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['jslint','jasmine', 'jsdoc']);
};