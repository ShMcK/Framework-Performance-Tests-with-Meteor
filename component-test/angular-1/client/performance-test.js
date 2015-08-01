angular.module('app')
  .directive('tComponent', templateComponent)
  .directive('tUComponent', templateUrlComponent)
  .directive('performanceTest', performanceTest);

/**
 * Template Component
 */
function templateComponent() {
  return {
    template: '<span>Item</span>'
  };
}

/**
 * Template URL Component
 */
function templateUrlComponent() {
  return {
    // find way to break cycle, like iterators
    templateUrl: 'client/component.ng.html'
  }
}

/**
 * Main Component
 */
function performanceTest() {
  return {
    templateUrl: 'client/performance-test.ng.html',
    controller: performanceTestCtrl,
    controllerAs: 'app'
  };
}

function performanceTestCtrl() {
  angular.extend(this, {
    counts: [10, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
    count: 0,
    runListArray: [],
    runTComponentArray: [],
    runTUComponentArray: [],
    setCountValue: function (value) {
      this.count = value;
    },
    runList: function () {
      this.runListArray = new Array(this.count);
    },
    // Template Components
    runTComponents: function () {
      this.runTComponentArray = new Array(this.count);
    },
    // Template URL Components
    runTUComponents: function () {
      this.runTUComponentArray = new Array(this.count);
    },
    reset: function () {
      this.count = 0;
      this.runListArray = [];
      this.runTComponentArray = [];
      this.runTUComponentArray = [];
    }
  });
}

// angular.extend syntax: http://toddmotto.com/a-better-way-to-scope-angular-extend-no-more-vm-this/