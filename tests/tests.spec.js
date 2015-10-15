var benchpress = require('benchpress');

var TEST = {
  SAMPLE_SIZE: 50, // number of times the test runs
  ADDRESS: 'http://localhost:3000/',
  COUNTS: [10, 100, 500, 1000, 2000, 3000, 4000, 5000], // intervals
  TIMEOUT_INTERVAL_VAR: 2000, // increase this if you're getting a timeout error
  USE_RESET: false // protractors clicks reset before running a test
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = TEST.COUNTS[TEST.COUNTS.length - 1] * TEST.TIMEOUT_INTERVAL_VAR;

var runner = new benchpress.Runner([
  benchpress.SeleniumWebDriverAdapter.PROTRACTOR_BINDINGS,
  benchpress.Validator.bindTo(benchpress.RegressionSlopeValidator),
  benchpress.bind(benchpress.RegressionSlopeValidator.SAMPLE_SIZE).toValue(TEST.SAMPLE_SIZE),
  benchpress.bind(benchpress.RegressionSlopeValidator.METRIC).toValue('scriptTime'),
  benchpress.bind(benchpress.Options.FORCE_GC).toValue(true)
]);

describe('Performance Tests', function () {

  // measure the time it takes to load rows
  function testPaintingTime(count) {
    it('time to paint ' + count + ' rows', function (done) {
      browser.ignoreSynchronization = true;
      browser.get(TEST.ADDRESS);
      runner.sample({
        id: 'load-rows',
        prepare: function () {
          if (TEST.USE_RESET) {
            return $('#reset').click();
          }
        },
        execute: function () {
          $('#count-' + count).click();
          return $('#run').click();
        }
      }).then(done, done.fail);
      addTitle('Testing time to paint ' + count * 10 + ' Items');
    });
  }

  // measure the time it takes to color 'Waldo's red
  function testFindWaldos(count) {
    it('time to find ' + count + ' Waldos', function (done) {
      browser.ignoreSynchronization = true;
      browser.get(TEST.ADDRESS);
      runner.sample({
        id: 'find-waldos',
        prepare: function () {
          if (TEST.USE_RESET) {
            $('#reset').click();
          }
          $('#count-' + count).click();
          return $('#run').click();
        },
        execute: function () {
          return $('#find-waldos').click();
        }
      }).then(done, done.fail);
      addTitle('Testing time to find ' + count + ' Waldos');
    });
  }

  // indicate separation between tests / counts
  function addTitle(message) {
    console.log('\n*********************************************************');
    console.log('************* ' + message + ' *************');
    console.log('*********************************************************\n');
  }

  // loop over counts and run tests
  for (var x = 0; x < TEST.COUNTS.length; x++) {
    testPaintingTime(TEST.COUNTS[x]);
    testFindWaldos(TEST.COUNTS[x]);
  }

});
