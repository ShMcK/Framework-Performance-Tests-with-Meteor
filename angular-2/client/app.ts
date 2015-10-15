import {Component, View, NgFor} from 'angular2/angular2';
import {bootstrap} from 'angular2-meteor';

@Component({
  selector: 'app'
})
@View({
  templateUrl: 'client/performance-test.ng.html',
  styleUrls: ['client/index.css'],
  directives: [NgFor]
})
class PerformanceTests {
  numbers:number[];
  items:any;
  counts:number[];
  selectedCount:number;
  waldoFilter:boolean;

  constructor() {
    Meteor.subscribe('items');
    this.numbers = _.range(1, 11);
    this.counts = [10, 100, 500, 1000, 2000, 3000, 4000, 5000];
    this.selectedCount = 1;
    this.waldoFilter = false;
    this.run();
  }

  run() {
    this.items = Items.find({}, {limit: this.selectedCount}).fetch();
  }

  reset() {
    this.selectedCount = 0;
    this.items = null;
    this.waldoFilter = false;
  }

  findWaldos() {
    this.waldoFilter = !this.waldoFilter;
  }

  isWaldo(name: string) {
    if (this.waldoFilter && name === 'Waldo') {
      return true;
    }
  }

  setCountValue(value: number) {
    this.selectedCount = value;
  }
}

bootstrap(PerformanceTests);
