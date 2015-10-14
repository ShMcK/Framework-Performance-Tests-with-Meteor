'use strict';

angular.module('app')
  .directive('performanceTest', performanceTest);

function performanceTest() {
  return {
    templateUrl: 'client/performance-test.ng.html',
    controller: performanceTestCtrl,
    controllerAs: 'app'
  };
}

function performanceTestCtrl($meteor) {
  $meteor.subscribe('items');
  var self = this;
  self.numbers = _.range(1, 11);
  self.counts = [10, 100, 500, 1000, 2000, 3000, 4000, 5000];
  self.waldoFilter = false;
  self.count = 1;

  self.runTest = function () {
    self.rows = $meteor.collection(function () {
      return Items.find({}, {
        limit: self.count
      });
    });
  };
  self.setCountValue = function (selectedCount) {
    self.count = selectedCount;
    console.log(self.count);
  };
  self.reset = function () {
    self.rows = null;
    self.count = 0;
    self.waldoFilter = false;
  };

  self.isWaldo = function (name) {
    if (self.waldoFilter && name === 'Waldo') {
      return true;
    }
  };
  self.findWaldos = function () {
    self.waldoFilter = !self.waldoFilter;
    console.log(self.waldoFilter);
  };
}
