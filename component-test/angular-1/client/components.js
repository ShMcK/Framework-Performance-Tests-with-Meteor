angular.module('app')
  .directive('tComponent', templateComponent)
  .directive('tUComponent', templateUrlComponent);

function templateComponent() {
  return {
    template: '<span>Component</span>'
  };
}

function templateUrlComponent() {
  return {
    // find way to break cycle, like iterators
    templateUrl: 'client/component.ng.html'
  }
}