Component = React.createClass({
  render: function () {
    return (<li><span>Item</span></li>);
  }
});

function arrayify(run, n) {
  if (run) {
    var array = [];
    for (var i = 0; i < n; i++) {
      array.push(i);
    }
    return array;
  } else {
    return [];
  }
}

App = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      runH: 0,
      runT: 0
    }
  },
  renderItem: function () {
    return (<span>Item</span>);
  },
  getCounts: function () {
    return [10, 100, 500, 1000, 2000, 3000, 4000, 5000];
  },
  renderCounts: function () {
    return this.getCounts().map((count) => {
      var countId = "count-" + count;
      return (<button key={count} onClick={()=>{this._changeCount(count)}} className="mdl-button"
                      id={countId}>{count}</button>);
    });
  },
  renderHRows: function () {
    if (this.state.runH && this.state.count) {
      console.log('running...');
      var array = [];
      for (var i = 0; i < this.state.count; i++) {
        array.push(<li><span>Item</span></li>);
      }
      return array;
    } else {
      return [];
    }
  },
  renderTRows: function () {
    if (this.state.runT && this.state.count) {
      var array = [];
      for (var i = 0; i < this.state.count; i++) {
        array.push(<Component />);
      }
      return array;
    } else {
      return [];
    }
  },
  _runH () {
    this.setState({'runH': true});
  },
  _runT() {
    this.setState({'runT': true});
  },
  _reset() {
    this.setState({count: 0, runH: false, runT: false});
  },
  _changeCount: function (newCount) {
    this.setState({runT: false, runH: false, count: newCount});
  },
  render: function () {
    return (<section className="pt">
      <div className="pt__options">
        <div className="pt__options--counts">
          {this.renderCounts()}
        </div>

        <button id="run" onClick={this._runH}
                className="mdl-button mdl-button--primary mdl-js-button mdl-button--raised mdl-js-ripple-effect">Run
          HTML
        </button>
        <button id="run" onClick={this._runT}
                className="mdl-button mdl-button--accent mdl-js-button mdl-button--raised mdl-js-ripple-effect">Run
          Template
        </button>
        <button id="reset" onClick={this._reset}
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Reset
        </button>
      </div>

      <div class="mdl-grid">
        <div class="test-list mdl-cell mdl-cell--4-col">
          <h5 class="title">HTML List</h5>

          <p>Component-free loop. Just HTML.</p>
          <ul>
            {this.renderHRows()}
          </ul>
        </div>

        <div class="test-list mdl-cell mdl-cell--4-col">
          <h5 class="title">Template List</h5>

          <p>Template List</p>
          <ul>
            {this.renderTRows()}
          </ul>
        </div>
      </div>

    </section>);
  }
});

Meteor.startup(function () {
  React.render(<App />, document.getElementById("app-target"));
});