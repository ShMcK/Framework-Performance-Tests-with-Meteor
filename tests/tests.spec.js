var benchpress = require('benchpress');

var TEST = {
  SAMPLE_SIZE: 10, // number of times the test runs
  ADDRESS: 'http://localhost:3000/',
  COUNTS: [10, 100, 500, 1000, 2000, 3000, 4000, 5000], // intervals
  TIMEOUT_INTERVAL_VAR: 1000, // increase this if you're getting a timeout error
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
          return;
        },
        execute: function () {
          $('#count-' + count).click();
          return $('#run').click();
        }
      }).then(done, done.fail);
      addTitle('Testing time to paint ' + count * 10 + ' Items');
    });
  }

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

  function addTitle(message) {
    console.log('\n*********************************************************');
    console.log('************* ' + message + ' *************');
    console.log('*********************************************************\n');
  }

  for (var x = 0; x < TEST.COUNTS.length; x++) {
    testPaintingTime(TEST.COUNTS[x]);
    testFindWaldos(TEST.COUNTS[x]);
  }

});
