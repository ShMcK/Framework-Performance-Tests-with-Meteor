Session.setDefault('count', 0);
Session.setDefault('runH', false); // html list
Session.setDefault('runT', false); // template list
var countsArray = [10, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

function arrayify(list, n) {
  if (Session.get(list)) {
    var array = [];
    for (var i = 0; i < n; i++) {
      array.push(i);
    }
    return array;
  } else {
    return [];
  }
}

Template.performanceTest.helpers({
  'counts': function () {
    return countsArray;
  },
  'hListArray': function () {
    return arrayify('runH', parseInt(Session.get('count')));
  },
  'tListArray': function () {
    return arrayify('runT', parseInt(Session.get('count')));
  }
});

Template.performanceTest.events({
  'click .count-selector': function (e) {
    var value = $(e.currentTarget).val();
    Session.set('count', value);
  },
  'click #reset': function () {
    Session.set('runH', false);
    Session.set('runT', false);
  },
  'click #run': function (e) {
    var letter = $(e.currentTarget).val();
    Session.set('run' + letter, true);
  }
});