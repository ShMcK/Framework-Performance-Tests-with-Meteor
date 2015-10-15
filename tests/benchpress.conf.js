// referenced from https://github.com/dfbaskin/render-large-datasets-angularjs-reactjs/blob/master/tests/angular-1-mount-grid.conf.js

// fix for memory leak issue
require('events').EventEmitter.prototype._maxListeners = 50;

exports.config = {

  directConnect: true,

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      // Important for Benchpress to get timeline data from the browser
      'args': ['--js-flags=--expose-gc'],
      'perfLoggingPrefs': {
        'traceCategories': 'blink.console,disabled-by-default-devtools.timeline'
      }
    },
    loggingPrefs: {
      performance: 'ALL'
    }
  },

  specs: [
    './tests.spec.js'
  ],
  framework: 'jasmine2',

  onPrepare: function () {
    var originalBrowser = browser;
    beforeEach(function () {
      global.browser = originalBrowser.forkNewDriverInstance();
      global.element = global.browser.element;
      global.$ = global.browser.$;
      global.$$ = global.browser.$$;
    });
    afterEach(function () {
      global.browser.quit();
      global.browser = originalBrowser;
    });
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};