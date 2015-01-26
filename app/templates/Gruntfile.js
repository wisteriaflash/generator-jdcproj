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
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%%= config.src %>/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%%= config.src %>/{,*/}*.html'
        ]
      }
    },

    //sass
    sass: {
      dist: {
        options: {
          style: 'compact',
          noCache: true
        },
        files: [{
          expand: true,
          cwd: '<%%= config.src %>/',
          src: ['{,*/}*.scss'],
          dest: '<%%= config.src %>',
          ext: '.css'
        }]
      }
    },

    //sprite
    sprite: {
      all: {
        src: '<%%= config.src %>/img/sprites/*.png',
        dest: '<%%= config.src %>/img/spritesheet.png',
        destCss: '<%%= config.src %>/css/sprites.css'
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
          ext: '.min.js'
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

  //defaul
  grunt.registerTask('default', [
    'watch'
  ]);
};