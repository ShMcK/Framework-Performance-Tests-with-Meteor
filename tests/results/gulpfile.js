var gulp = require('gulp');
var vinyl = require('vinyl-fs');
var fs = require('fs');
var map = require('map-stream');
//var gutil = require('gulp-util');
var readline = require('readline');


/* Regex conditions for picking data */
var paintRegex = RegExp(/^\*{13} Testing time to paint (\d+) Items \*{13}$/gm);
var findRegex = RegExp(/^\*{13} Testing time to find (\d+) Waldos \*{13}$/gm);
var preDataRegex = RegExp(/^[={18} \|]+$/gm);
var dataRegex = RegExp(/(\s+(\d+\.\d+(\+\-\d+\%)?)(?: \|)?)+/gm);
var dataFailureStop = RegExp(/^\*{57}/gm);

var input = './completed/*.txt';
var output = './results.md';

var measure = {
  script: 7,
  pureScript: 5,
  render: 6
};

// track file index
var fileIndex = 0;
var overallData = [];

gulp.task('collect', function () {
  // reset overallData
  overallData = [];

  vinyl.src(input)
    .pipe(map(function (file, cb) {

      var recorder = {
        counts: [],
        paint: [],
        find: []
      };
      var collectedPaint = [];
      var collectedFind = [];

      var rl = readline.createInterface({
        input: fs.createReadStream(file.path, 'utf8')
      });

      var prepareRecord = false;
      var recordData = false;
      var curMode = 'paint';

      function nextMode() {
        if (prepareRecord) {
          recorder[curMode].push('error');
        }
        prepareRecord = true;
        recordData = false;
      }

      rl.on('line', function (line) {
        // matching paint
        if (line.match(paintRegex)) {
          nextMode();
          curMode = 'paint';

        }
        // matching find
        else if (line.match(findRegex)) {
          nextMode();
          recorder.counts.push(trimToNumbersOnly(line));
          curMode = 'find';
        }
        // matching line before data
        else if (line.match(preDataRegex)) {
          recordData = true;
        }
        // recording data
        else if (recordData) {
          recorder[curMode].push(trimResults(line));
          prepareRecord = false;
          recordData = false;
        }
      });

      // print rows of data from recorder
      rl.on('close', function() {
        console.log('\n');
        console.log(`File: ${file.basename}`);
        console.log('\n');

        console.log('|           Counts |        Paint DOM |  Find / Re-Paint |');
        console.log('| ----------------:| ----------------:| ----------------:|');

        recorder.counts.forEach(function (count, index) {
          // see measures {script, pureScript, render}
          var script = measure.script;
          var totalPaint = parseInt(recorder.paint[index][script]);
          collectedPaint.push(totalPaint);
          var totalFind = parseInt(recorder.find[index][script]);
          collectedFind.push(collectedFind);
          console.log(`| ${getSpaces(count)}${count} | ${getSpaces(totalPaint)}${totalPaint} | ${getSpaces(totalFind)}${totalFind} |`);
        });
      });

      overallData.push({
        file: file.basename.substr(0, input.lastIndexOf('.')),
        paint: collectedPaint,
        find: collectedFind
      });
      console.log(overallData);

      fileIndex += 1;
      cb(null, file);
    }));
});

gulp.task('charts', ['collect'], function () {
  console.log(overallData);
});

gulp.task('default', ['collect']);

// adjust spaces in output
function getSpaces(number) {
  return ' '.repeat(16 - number.toString().length);
}

// not efficient, but couldn't get regex captures to work
function trimToNumbersOnly(string) {
  return string.replace(/\D/g, '');
}

// remove white space around data
function trimResults(string) {
  var array = string.split('|');
  return array.map(function (string) {
    return string.trim();
  });
}


