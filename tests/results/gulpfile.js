var gulp = require('gulp'),
  vinyl = require('vinyl-fs'),
  fs = require('fs'),
  map = require('map-stream'),
  runSequence = require('run-sequence').use(gulp),
  readline = require('readline');

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

var fileIndex = 0;
var colors = ['27, 133, 184', '90, 82, 85', '174, 90, 65', '195, 203, 113'];
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
      rl.on('close', function () {
        console.log('\n');
        console.log(`File: ${file.basename}`);
        console.log('\n');

        console.log('|           Counts |        Paint DOM |  Find / Re-Paint |');
        console.log('| ----------------:| ----------------:| ----------------:|');

        recorder.counts.forEach(function (count, index) {
          var totalPaint = parseInt(recorder.paint[index][measure.script]);
          var totalFind = parseInt(recorder.find[index][measure.script]);
          console.log(`| ${getSpaces(count)}${count} | ${getSpaces(totalPaint)}${totalPaint} | ${getSpaces(totalFind)}${totalFind} |`);
        });

        overallData.push({
          label: file.basename.substr(0, file.basename.lastIndexOf('.')),
          color: colors[fileIndex],
          data: {
            paint: recorder.paint.map(mapScriptData),
            find: recorder.find.map(mapScriptData)
          }
        });
      });
      fileIndex += 1;
      cb(null, file);
    }));

});

gulp.task('chart', function (cb) {
  console.log(overallData);
  return cb;
});

gulp.task('default', function(cb) {
 runSequence('collect', 'chart', cb);
});

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

function mapScriptData(item) {
  return item[measure.script];
}
