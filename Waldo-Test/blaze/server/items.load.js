Meteor.startup(function () {
  var names = ['Waldo', 'Odlaw', 'Aldow', 'Wodal', 'Lodaw', 'Ladow', 'Owlda', 'Woald', 'Dawol', 'Oawld'];

  if (Items.find().count() === 0) {
    var max = 5000;

    for (var i = 0; i < max + 1; i++) {
      Items.insert({
       names: _.shuffle(names)
      });
    }
  }
});