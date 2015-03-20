/*
 * grunt-generator-jdcproj
 * http://github.com/hollandben/grunt-sprite-generator
 *
 * Copyright (c) 2015 Wisteria
 * Licensed under the MIT license.
 */

'use strict';

/*global module */

module.exports = function(grunt) {
  'use strict';

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);


  // Configurable paths
  var config = {
    src: 'src',
    dist: 'dist'
  };

  //config
  grunt.initConfig({

    // Project settings
    config: config,

    //watch
    watch: {
      sass: {
        files: ['<%%= config.src %>/{,*/}*.scss'],
        tasks: ['sass']
      }
    },

    // browserSync
    browserSync: {
      bsFiles: {
        src: [
          '<%= config.src %>/{,*/}*.css',
          '<%= config.src %>/{,*/}*.html',
          '<%= config.src %>/{,*/}*.js'
        ]
      },
      options: {
        server: {
          baseDir: "./",
          port: '3001'
        },
        watchTask: true // < VERY important
      }
    },

    //sass
    sass: {
      dist: {
        options: {
          style: 'compact',
          noCache: true,
          loadPath: [
              'bower_components/compass-mixins/lib/',
              'bower_components/font-awesome/scss/',
              'bower_components/bourbon/app/assets/stylesheets/'
            ]
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/scss',
          src: ['{,*/}*.scss'],
          dest: '<%= config.src %>/css',
          ext: '.css'
        }]
      }
    },

    //sprite
    sprite: {
      all: {
        src: '<%%= config.src %>/img/sprites/*.png',
        dest: '<%%= config.src %>/img/spritesheet.png',
        destCss: '<%%= config.src %>/css/sprites.scss'
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= config.dist %>/*',
            '!<%%= config.dist %>/.git*'
          ]
        }]
      },
      tmp: '.tmp'
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= config.src %>',
          dest: '<%%= config.dist %>',
          src: [
            '{,*/}*.html',
            'img/**'
          ]
        }, {
          expand: true,
          flatten: true,
          src: ['bower_components/font-awesome/fonts/**'],
          dest: '<%= config.dist %>/fonts/',
          filter: 'isFile'
        }]
      },
      fontscopy: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/font-awesome/fonts/**'],
          dest: '<%= config.src %>/fonts/',
          filter: 'isFile'
        }]
      }
    },


    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.src %>/',
          src: '**/img/{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= config.dist %>'
        }]
      }
    },

    // cssmin
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },

    // uglify
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.src %>/',
          src: ['{,*/}*.js'],
          dest: '<%%= config.dist %>',
          ext: '.js'
        }]
      }
    },

    //base64
    dataUri: {
      dist: {
        // src file
        src: ['<%%= config.src %>/**/{,*/}*.css'],
        // output dir
        dest: '<%%= config.src %>/img/',
        options: {
          // specified files are only encoding
          target: ['<%%= config.src %>/img/base64/*.*'],
          // adjust relative path?
          fixDirLevel: true,
          // img detecting base dir
          // baseDir: './'

          // Do not inline any images larger
          // than this size. 2048 is a size
          // recommended by Google's mod_pagespeed.
          maxBytes: 2048,
        }
      }
    }

  });

  //bulid
  grunt.registerTask('build', [
    'clean:dist',
    'cssmin',
    'uglify',
    'copy',
    'clean:tmp',
  ]);

  //init
  grunt.registerTask('init', [
    'copy:fontscopy'
  ]);

  //defaul
  grunt.registerTask('default', [
    'browserSync',
    'watch'
  ]);
};