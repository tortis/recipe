module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                banner: '////////////////////////////////////////////////////////////////////////////////\n'+
                        '//                     THIS FILE IS AUTOMATICALLY GENERATED                   //\n'+
                        '////////////////////////////////////////////////////////////////////////////////\n',
                separator: '\n'
            },
            dist: {
                src: ['components/**/*.js'],
                dest: 'recipe.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'recipe.min.js': ['recipe.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
};
