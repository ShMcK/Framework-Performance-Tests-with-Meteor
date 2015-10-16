var benchpress = require('benchpress'),
  async = require('asyncawait/async'),
  await = require('asyncawait/await');

// fix for memory leak issue
require('events').EventEmitter.prototype._maxListeners = 25;

var TEST = {
  SAMPLE_SIZE: 10, // number of times the test runs
  ADDRESS: 'http://localhost:3000/',
  COUNTS: [10, 100, 500, 1000, 2000, 3000, 4000, 5000], // intervals // 4000, 5000
  TIMEOUT_INTERVAL_VAR: 1000 // increase this if you're getting a timeout error
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
    it('time to paint ' + count + ' rows', async(function (done) {
      browser.ignoreSynchronization = true;
      await (browser.get(TEST.ADDRESS));
      runner.sample({
        id: 'load-rows',
        prepare: function () {},
        execute: function () {
          $('#count-' + count).click();
          return $('#run').click();
        }
      }).then(done, done.fail);
      addTitle('Testing time to paint ' + count * 10 + ' Items');
    }));
  }

  // measure the time it takes to color 'Waldo's red
  function testFindWaldos(count) {
    it('time to find ' + count + ' Waldos', async (function (done) {
      browser.ignoreSynchronization = true;
      await (browser.get(TEST.ADDRESS));
      runner.sample({
        id: 'find-waldos',
        prepare: function () {
          $('#count-' + count).click();
          return $('#run').click();
        },
        execute: function () {
          return $('#find-waldos').click();
        }
      }).then(done, done.fail);
      addTitle('Testing time to find ' + count + ' Waldos');
      //browser.close();
    }));
  }

  // indicate separation between tests / counts
  function addTitle(message) {
    console.log('\n*********************************************************');
    console.log('************* ' + message + ' *************');
    console.log('*********************************************************\n');
  }

  // additional settings


  // loop over counts and run tests
  for (var x = 0; x < TEST.COUNTS.length; x++) {
    testPaintingTime(TEST.COUNTS[x]);
    testFindWaldos(TEST.COUNTS[x]);
  }

});
