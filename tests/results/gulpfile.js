var gulp = require('gulp');
var fs = require('vinyl-fs');
var map = require('map-stream');
var match = require('gulp-match');

/* Regex conditions for picking data */
var paintCountRegex = RegExp(/^\*{13} Testing time to paint (\d+) Items \*{13}$/gm);
var findWaldosCountRegex = RegExp(/^\*{13} Testing time to find (\d+) Waldos \*{13}$/gm);
var dataRegex = RegExp(/^[={18} \|]+$\n(\s+(\d+\.\d+(\+\-\d+\%)?)(?: \|)?)+/);

var input = './*.txt';
var output = './results.md';

var condition = true; // TODO: add business logic here
var options = null; // Optionally pass options to minimatch

gulp.task('collect', function () {
  fs.src(input)
    .pipe(map(function(file, cb) {
      // match paintCountRegex or findWaldosCountRegex
      var isMatch = match(file, condition, options);

      if (isMatch) {
        // match dataRegex

      }
      cb(null, file);
    }));
});

gulp.task('default', ['collect']);