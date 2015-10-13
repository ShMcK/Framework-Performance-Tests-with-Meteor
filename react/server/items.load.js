if (Meteor.isServer) {
  Meteor.methods({
    'React': function getReact() {
      var React = Meteor.npmRequire('react');
      return React;
    },
    'ReactDOM': function getReactDOM() {
      var React = Meteor.npmRequire('react-dom');
      return React;
    }    
  });
}


Meteor.startup(function () {
  var names = ['Waldo', 'Odlaw', 'Aldow', 'Wodal', 'Lodaw', 'Ladow', 'Owlda', 'Woald', 'Dawol', 'Oawld'];

  if (Items.find().count() === 0) {
    var max = 5000;

    _.times(max, function() {
      Items.insert({
        names: _.shuffle(names)
      });
    });
  }
  
});