Session.setDefault('limit', 1);
Session.setDefault('running', false);
Session.setDefault('waldoFilter', false);
Meteor.subscribe('items');

Template.performanceTest.helpers({
  'rows': function () {
    if (Session.get('running')) {
      return Items.find({}, {limit: parseInt(Session.get('limit'))});
    } else {
      return null;
    }
  },
  'numbers': function () {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  },
  'counts': function () {
    return [10, 100, 500, 1000, 2000, 3000, 4000, 5000];
  },
  'isWaldo': function () {
    if (Session.get('waldoFilter') && this == 'Waldo') {
      return {class: 'waldo'};
    }
  }
});


Template.performanceTest.events({
  'click .count-selector': function (e) {
    var value = $(e.currentTarget).val();
    Session.set('running', false);
    Session.set('limit', value);
  },
  'click #reset': function () {
    Session.set('limit', 0);
    Session.set('running', false);
    Session.set('waldoFilter', false);
  },
  'click #run': function () {
    Session.set('running', true);
  },
  'click #find-waldos': function () {
    Session.set('waldoFilter', !Session.get('waldoFilter'));
  }
});