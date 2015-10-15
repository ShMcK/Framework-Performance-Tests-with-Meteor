var gulp = require('gulp');
var vinyl= require('vinyl-fs');
var fs = require('fs');
var map = require('map-stream');
var gutil = require('gulp-util');

/* Regex conditions for picking data */
var paintCountRegex = RegExp(/^\*{13} Testing time to paint (\d+) Items \*{13}$/gm);
var findWaldosCountRegex = RegExp(/^\*{13} Testing time to find (\d+) Waldos \*{13}$/gm);
var dataRegex = RegExp(/^[={18} \|]+$\n(\s+(\d+\.\d+(\+\-\d+\%)?)(?: \|)?)+/);

var input = './*.txt';
var output = './results.md';

gulp.task('collect', function () {
  vinyl.src(input)
    .pipe(map(function(file, cb) {
      // blaze.txt
      console.log(file.basename);
      var content = fs.readFileSync(file.path, "utf8");
      console.log(content);

      cb(null, file);
    }));
});

gulp.task('default', ['collect']);