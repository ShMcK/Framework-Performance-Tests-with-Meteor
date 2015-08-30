

var PureRenderMixin = React.addons.PureRenderMixin;

var Cell = React.createClass({
  //mixins: [PureRenderMixin], the pure render mixin can replace the following optimization
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.class === this.props.class && nextProps.name === this.props.name){
      return false;
    }
    return true;
  }, 
  render: function(){    
    return (<td className={this.props.class}>{this.props.name}</td>);
  }
});

App = React.createClass({
  componentWillMount: function() {
    this.items = [];
    this.limit = 1;
    Meteor.subscribe('items');
  },
  getInitialState: function () {
    return {
      running: false,
      waldoFilter: false,
    }
  },
  renderRows: function() {
    return this.items.map((row) => {
      var names = row.names.map((name, index) => {
        var classString;
        if (this.state.waldoFilter && name === 'Waldo') {
          classString = 'waldo'
        }
        return (<Cell key={index} class={classString} name={name} />);
      });
      return (<tr key={row._id}>{names}</tr>);
    });
  },  
  getCounts: function () {
    return [10, 100, 500, 1000, 2000, 3000, 4000, 5000];
  },
  renderCounts: function () {
    return this.getCounts().map((count) => {
      var countId = "count-" + count;
      return (<button key={countId} onClick={()=>{this._changeLimit(count)}} className="mdl-button"
                      id={countId}>{count}</button>);
    });
  },
  getNumbers: function () {
    return _.range(1, 11);
  },
  renderTableHeads: function () {
    return this.getNumbers().map((number,i) => {
      return <th key={i} className="mdl-data-table__cell--non-numeric">{number}</th>;
    })
  },
  _run: function () {
    this.items = Items.find({}, { limit: this.limit }).fetch();
    this.setState({ running: true, })
  },
  _reset: function () {
    this.items = [];
    this.setState({ waldoFilter: false, running: false })
  },
  _changeLimit: function (newLimit) {
    this.limit = newLimit;
  },
  _findWaldos: function () {
    this.setState({ waldoFilter: !this.state.waldoFilter })
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
        <button id="find-waldos" onClick={this._findWaldos}
                className="mdl-button mdl-button--accent mdl-button--raised">
          Find Waldos
        </button>
      </div>
      <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
        <thead>
        <tr>
          {this.renderTableHeads()}
        </tr>
        </thead>

        {this.renderRows()}

      </table>
    </section>);
  }
});



Meteor.startup(function () {
  React.render(<App />, document.getElementById("app-target"));
});

/**
 * Memory Profiling
 * https://github.com/paulirish/memory-stats.js/tree/master
 */
// open /Applications/Google\ Chrome.app --args --enable-precise-memory-info
(function(){var script=document.createElement('script');script.src='https://rawgit.com/paulirish/memory-stats.js/master/bookmarklet.js';document.head.appendChild(script);})()