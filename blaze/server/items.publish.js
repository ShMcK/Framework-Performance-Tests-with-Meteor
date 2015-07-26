Meteor.publish('items', function (options) {
  return Items.find({}, options);
});