var benchpress = require('benchpress');

var TEST = {
  SAMPLE_SIZE: 20, // number of times the test runs
  ADDRESS: 'http://localhost:3000/',
  COUNTS: [10, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
  TIMEOUT_INTERVAL_VAR: 300 // increase this if youre getting a timeout error
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = TEST.COUNT * TEST.TIMEOUT_INTERVAL_VAR;

// emitter.setMaxListeners()

var runner = new benchpress.Runner([
  benchpress.SeleniumWebDriverAdapter.PROTRACTOR_BINDINGS,
  benchpress.Validator.bindTo(benchpress.RegressionSlopeValidator),
  benchpress.bind(benchpress.RegressionSlopeValidator.SAMPLE_SIZE).toValue(TEST.SAMPLE_SIZE),
  benchpress.bind(benchpress.RegressionSlopeValidator.METRIC).toValue('scriptTime'),
  benchpress.bind(benchpress.Options.FORCE_GC).toValue(true)
]);

describe('Performance Tests', function () {

  function renderList(count, target) {
    var title;
    switch (target) {
      case 'H':
        title = 'HTML';
        break;
      case 'T':
        title = 'Component with Template';
        break;
      case 'U':
        title = 'Component with TemplateUrl';
        break;
      default:
        throw 'Invalid target. Must be H, T or U.'
    }

    it('render ' + title + ': ' + count + ' rows', function (done) {
      browser.ignoreSynchronization = true;
      browser.get(TEST.ADDRESS);
      runner.sample({
        id: title,
        prepare: function () {
          return $('#reset').click();
        },
        execute: function () {
          $('#count-' + count).click();
          return $('#run' + target).click();
        }
      }).then(done, done.fail);
      addTitle('Testing time to paint ' + count * 10 + ' Items');
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
    renderList(TEST.COUNTS[x], 'H');
    renderList(TEST.COUNTS[x], 'T');
    renderList(TEST.COUNTS[x], 'U');
  }


});
