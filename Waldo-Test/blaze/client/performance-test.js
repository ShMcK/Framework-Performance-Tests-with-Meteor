Meteor.subscribe('items');

Template.performanceTest.created = function () {
  this.state = new ReactiveDict();
  this.state.set('limit', 0);
  this.state.set('running', false);
  this.state.set('waldoFilter', false);
};

Template.performanceTest.helpers({
  'rows': function () {
    var template = Template.instance();
    if (template.state.get('running')) {
      return Items.find({}, {limit: parseInt(template.state.get('limit'))});
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
    if (Template.instance().state.get('waldoFilter') && this == 'Waldo') {
      return {class: 'waldo'};
    }
  }
});


Template.performanceTest.events({
  'click .count-selector': function (e, template) {
    var value = $(e.currentTarget).val();
    template.state.set('running', false);
    template.state.set('limit', value);
  },
  'click #reset': function (e, template) {
    template.state.set('running', false);
    template.state.set('waldoFilter', false);
  },
  'click #run': function (e, template) {
    template.state.set('running', true);
  },
  'click #find-waldos': function (e, template) {
    template.state.set('waldoFilter', !template.state.get('waldoFilter'));
  }
});