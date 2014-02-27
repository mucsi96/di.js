module.exports = function(grunt) {

    var src = ['src/**/*.js'],
        specs = ['specs/**/*.js'],
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
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-jsdoc');


    grunt.registerTask('default', ['jslint','jasmine', 'jsdoc']);
};