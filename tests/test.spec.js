var benchpress = require('benchpress');

var TEST = {
  SAMPLE_SIZE: 20, // number of times the test runs
  ADDRESS: 'http://localhost:3000/',
  COUNT: 100, // 10, 100, 500, 1000, 2000, 3000, 4000, 5000
  TIMEOUT_INTERVAL_VAR: 300 // increase this if youre getting a timeout error
};

// increase test count timeout interval proportionally with number of counts
jasmine.DEFAULT_TIMEOUT_INTERVAL = TEST.COUNT * TEST.TIMEOUT_INTERVAL_VAR;

var runner = new benchpress.Runner([
  benchpress.SeleniumWebDriverAdapter.PROTRACTOR_BINDINGS,
  benchpress.Validator.bindTo(benchpress.RegressionSlopeValidator),
  benchpress.bind(benchpress.RegressionSlopeValidator.SAMPLE_SIZE).toValue(TEST.SAMPLE_SIZE),
  benchpress.bind(benchpress.RegressionSlopeValidator.METRIC).toValue('scriptTime'),
  benchpress.bind(benchpress.Options.FORCE_GC).toValue(true)
]);

describe('Performance Test', function () {

  it('time to paint ' + TEST.COUNT + ' rows', function (done) {

    browser.get(TEST.ADDRESS);

    runner.sample({
      id: 'load-rows',
      prepare: function () {
        return $('#reset').click();
      },
      execute: function () {
        $('#count-' + TEST.COUNT).click();
        return $('#run').click();
      }
    }).then(done, done.fail);
  });

  it('time to find ' + TEST.COUNT + ' Waldos', function (done) {
    browser.get(TEST.ADDRESS);
    runner.sample({
      id: 'find-waldos',
      prepare: function () {
        $('#reset').click();
        $('#count-' + TEST.COUNT).click();
        return $('#run').click();
      },
      execute: function () {
        return $('#find-waldos').click();
      }
    }).then(done, done.fail);

  });
});
