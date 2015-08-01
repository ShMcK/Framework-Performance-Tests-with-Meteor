angular.module('app').config(optimizations);

function optimizations($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}