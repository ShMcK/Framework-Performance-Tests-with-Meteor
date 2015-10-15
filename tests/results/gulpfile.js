var gulp = require('gulp');
var fs = require('vinyl-fs');
var map = require('map-stream');
var match = require('gulp-match');

/* Regex conditions for picking data */
var paintCountRegex = /^\*{13} Testing time to paint (\d+) Items \*{13}$/gm;
var findWaldosCountRegex = /^\*{13} Testing time to find (\d+) Waldos \*{13}$/gm;
var dataRegex = /^[={18} \|]+$\n(\s+(\d+\.\d+(\+\-\d+\%)?)( \|)?)+/;

var source = './*.txt';

var condition = true; // TODO: add business logic here
var options = null; // Optionally pass options to minimatch

gulp.task('collect', function () {
fs.src(source)
.pipe(map(function(file, cb) {
    var isMatch = match(file, condition, options);
    if (isMatch) {
      console.log('match!');
    }
    cb(null, file);
  }));
});

gulp.task('default', ['collect']);