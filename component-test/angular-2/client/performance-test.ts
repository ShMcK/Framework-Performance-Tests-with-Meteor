import {Component, View, NgFor, bootstrap} from 'angular2/angular2';
declare var Items:any;

/**
 * Template Component
 */
@Component({
  selector: 't-component'
})
@View({
  template: '<span>Item</span>'
})
export class Template {
}

/**
 * Template url Component
 */
@Component({
  selector: 't-u-component'
})
@View({
  templateUrl: 'client/component.ng.html'
})
export class TemplateUrl {
}

/**
 * Main Component
 */
@Component({
  selector: 'performance-test'
})
@View({
  templateUrl: 'client/performance-test.ng.html',
  styleUrls: ['client/index.css'],
  directives: [NgFor, Template, TemplateUrl]
})
class PerformanceTests {
  counts:number[];
  count:number;
  runListArray;
  runTComponentArray;
  runTUComponentArray;

  constructor() {
    this.counts = [10, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
    this.count = 0;
    this.runListArray = [];
    this.runTComponentArray = [];
    this.runTUComponentArray = [];
  }

  setCountValue(value) {
    this.count = value;
  }

  runList() {
    this.runListArray = new Array(this.count);
  }

  runTComponents() {
    this.runTComponentArray = new Array(this.count);
  }

  runTUComponents() {
    this.runTUComponentArray = new Array(this.count);
  }

  reset() {
    this.count = 0;
    this.runListArray = [];
    this.runTComponentArray = [];
    this.runTUComponentArray = [];
  }
}

bootstrap(PerformanceTests, []);