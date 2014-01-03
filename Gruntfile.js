module.exports = function(grunt) {

  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      my_target: {
        src: 'styles/main.css'
      },
    },

    browser_sync: {
      files: {
        src : [
          'styles/*.css',
          'images/**/*.jpg',
          'images/**/*.png',
          'js/*.js',
          '*.html',
        ],
      },
      options: {
        server: {
          baseDir: ""
        },
      },
    },

    watch: {

      /* watch to see if the sass files are changed, compile and add prefixes */

      styles: {
        files: ['styles/main.css'],
        tasks: ['autoprefixer:my_target']
      },

      /* watch and see if our javascript files change */
      // js: {
      //   files: ['scripts/*.js'],
      //   tasks: ['newer:uglify:my_target']
      // },

    }

  });

  //Task list
  grunt.registerTask('default', 'browser_sync');
};
