Meteor.methods({
  'React': function getReact() {
    var React = Meteor.npmRequire('react');
    return React;
  },
  'ReactDOM': function getReactDOM() {
    var ReactDOM = Meteor.npmRequire('react-dom');
    return ReactDOM;
  }
});