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
          '<%%= config.src %>/**/*.css',
          '<%%= config.src %>/**/*.html',
          '<%%= config.src %>/{,*/}*.js'
        ]
      },
      options: {
        server: {
          baseDir: "./"
        },
        startPath: '/src/html/index.html',
        watchTask: true // < VERY important
      }
    },

    //sass
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
          includePaths: [
            'bower_components/normalize-scss/',
            'bower_components/bourbon/app/assets/stylesheets/'
          ]
        },
        files: [{
          expand: true,
          cwd: '<%%= config.src %>/scss',
          src: ['{,*/}*.scss'],
          dest: '<%%= config.src %>/css',
          ext: '.css'
        }]
      }
    },

    //sprite
    sprite: {
      icons: {
        src: '<%%= config.src %>/img/icon-sprites/*.png',
        dest: '<%%= config.src %>/img/sprites.png',
        destCss: '<%%= config.src %>/css/_sprites.scss'
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
      options: {
        except: ['<%= config.src %>/src/libs']
      },
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
    },
    bowercopy: {
      options: {
        // Bower components folder will be removed afterwards
        // clean: true
      },
      // Javascript
      libs: {
        options: {
          destPrefix: 'src/libs'
        },
        files: {
          'zepto.min.js': 'zepto-full/zepto.min.js',
          'hammer.min.js': 'hammer.js/hammer.min.js'
        }
      }
    },
    // ftp (使用时，请更改.ftppass中ftp的账户信息)
    ftpscript: {
      all: {
        options: {
          host: '192.168.144.59',
          authKey: 'myhost',
          type: 'binary'
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**'],
          dest: '/test/dist/'
        }]
      },
      codefile: { //only code files
        options: {
          host: '192.168.144.59',
          authKey: 'myhost',
          type: 'binary'
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*.html', '**/*.css', '**/*.js', '!libs/**'],
          dest: '/test/dist/'
        }]
      },
      imgfile: { //only img files
        options: {
          host: '192.168.144.59',
          authKey: 'myhost',
          type: 'binary'
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['img/**'],
          dest: '/test/dist/'
        }]
      }
    }

  });

  //bulid
  grunt.registerTask('build', [
    'clean:dist',
    'cssmin',
    'uglify',
    'copy:dist',
  ]);

  //init-初始化运行
  grunt.registerTask('init', [
    'bowercopy'
  ]);


  //defaul
  grunt.registerTask('default', [
    'browserSync',
    'watch'
  ]);
};