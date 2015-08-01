App = React.createClass({
  getInitialState: function () {
    return {
      count: 0
    }
  },
  renderItems: function () {
    return ();
  },
  getCounts: function () {
    return [10, 100, 500, 1000, 2000, 3000, 4000, 5000];
  },
  renderCounts: function () {
    return this.getCounts().map((count) => {
      var countId = "count-" + count;
      return (<button key={count} onClick={()=>{this._changeLimit(count)}} className="mdl-button"
                      id={countId}>{count}</button>);
    });
  },
  _run () {},
  _reset() {},
  _changeLimit: function (newLimit) {
    this.setState({running: false, limit: newLimit});
  },
  render: function () {
    return (<section className="pt">
      <div className="pt__options">
        <div className="pt__options--counts">
          {this.renderCounts()}
        </div>

        <button id="run" onClick={this._run}
                className="mdl-button mdl-button--primary mdl-js-button mdl-button--raised mdl-js-ripple-effect">Run
        </button>
        <button id="reset" onClick={this._reset}
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Reset
        </button>
      </div>

    </section>);
  }
});

Meteor.startup(function () {
  React.render(<App />, document.getElementById("app-target"));
});