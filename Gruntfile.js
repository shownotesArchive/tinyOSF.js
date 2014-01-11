module.exports = function(grunt) {
  gzip = require("gzip-js");
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compare_size: {
      files: [ "tinyosf.js", "dist/tinyosf.js", "dist/tinyosf.min.js" ],
      options: {
        compress: {
          gz: function( contents ) {
            return gzip.zip( contents, {} ).length;
          }
        },
        cache: "dist/.sizecache.json"
      }
    },
    concat: {
      options: {
        separator: '\n\n'
      },
      dist: {
        src: ['./tinyosf.js', 'tinyosf_exportmodules.js'],
        dest: './dist/tinyosf.js'
      }
    },
    jshint: {
      files: ['./dist/tinyosf.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        globals: {}
      }
    },
    uglify: {
      options: {
        banner: '/* * * * * * * * * *\n' +
                ' *   tinyOSF .js   *\n' +
                ' *  Version <%= pkg.version %>  *\n' +
                ' *  License:  MIT  *\n' +
                ' * Simon  Waldherr *\n' +
                ' * * * * * * * * * */\n\n',
        footer: '\n\n\n\n /* foo */'
      },
      dist: {
        files: {
          './dist/tinyosf.min.js': ['./dist/tinyosf.js']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          './dist/shownotes.css': ['./shownotes.css']
        }
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, src: 'dist/tinyosf.min.js', dest: 'dist/', ext: '.gz.js'}
        ]
      }
    }
  });
  grunt.loadNpmTasks("grunt-compare-size");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['concat', 'jshint', 'uglify', 'cssmin', 'compare_size']);
};
