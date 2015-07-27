var benchpress = require('benchpress');

var TEST = {
  IS_ANGULAR_2: false,
  SAMPLE_SIZE: 20, // number of times the test runs
  ADDRESS: 'http://localhost:3000/',
  COUNTS: [10, 100, 500, 1000, 2000, 3000, 4000, 5000],
  TIMEOUT_INTERVAL_VAR: 300 // increase this if youre getting a timeout error
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = TEST.COUNT * TEST.TIMEOUT_INTERVAL_VAR;

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
      browser.ignoreSynchronization = !TEST.IS_ANGULAR_2;
      browser.get(TEST.ADDRESS);
      runner.sample({
        id: 'load-rows',
        prepare: function () {
          return $('#reset').click();
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
      browser.ignoreSynchronization = !TEST.IS_ANGULAR_2;
      browser.get(TEST.ADDRESS);
      runner.sample({
        id: 'find-waldos',
        prepare: function () {
          $('#reset').click();
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
    console.log('\n');
    console.log('*********************************************************');
    console.log('************* ' + message + ' *************');
    console.log('*********************************************************');
    console.log('\n');
  }

  for (var x = 0; x < TEST.COUNTS.length; x++) {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TEST.COUNTS[x] * TEST.TIMEOUT_INTERVAL_VAR;
    testPaintingTime(TEST.COUNTS[x]);
    testFindWaldos(TEST.COUNTS[x]);
  }


});
