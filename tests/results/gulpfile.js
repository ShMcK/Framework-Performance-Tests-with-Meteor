var gulp = require('gulp');
var vinyl= require('vinyl-fs');
var fs = require('fs');
var map = require('map-stream');
//var gutil = require('gulp-util');

/* Regex conditions for picking data */
//var paintCountRegex = RegExp(/^\*{13} Testing time to paint (\d+) Items \*{13}$/gm);
var findWaldosCountRegex = RegExp(/^\*{13} Testing time to find (\d+) Waldos \*{13}$/gm);
var dataRegex = RegExp(/^[={18} \|]+$\n(\s+(\d+\.\d+(\+\-\d+\%)?)(?: \|)?)+/gm);

var input = './*.txt';
var output = './results.md';

gulp.task('collect', function () {
  vinyl.src(input)
    .pipe(map(function(file, cb) {

      console.log('\n');
      console.log(`File: ${file.basename}`);
      console.log('\n');

      var content = fs.readFileSync(file.path, "utf8");
      var countsMatches = content.match(findWaldosCountRegex);
      var counts = trimToNumbersOnly(countsMatches);

      var dataMatches = content.match(dataRegex);
      var data = trimResults(dataMatches);

      paintData = [];
      repaintData = [];

      data.forEach(function(data, index) {
        if (index % 2 === 0) {
          paintData.push(data);
        } else {
          repaintData.push(data);
        }
      });

      console.log('|           Counts |        Paint DOM |     Re-Paint DOM |');
      console.log('| ----------------:| ----------------:| ----------------:|');

      counts.forEach(function(count, index) {
        var col = 5;
        console.log(`| ${getSpaces(count)}${count} | ${getSpaces(paintData[index][col])}${paintData[index][col]} | ${getSpaces(repaintData[index][col])}${repaintData[index][col]} |`);
      });

      cb(null, file);
    }));
});

gulp.task('default', ['collect']);

function getSpaces(string) {
  return ' '.repeat(16 - string.length);
}

// not efficient, but couldn't get regex captures to work
function trimToNumbersOnly (arrayOfStrings) {
  return arrayOfStrings.map(function (string) {
    return string.replace(/\D/g, '');
  });
}

var barLength = '================== | ================== | ================== | ================== | ================== | ==================\n'.length;
function trimResults (arrayOfStrings) {
  return arrayOfStrings
    .map(function(string) {
      var array = string.slice(barLength)
        .split('|');
      return array.map(function(string) {
        return string.trim();
      })
    });
}


