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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat', 'uglify', 'compare_size']);
};
