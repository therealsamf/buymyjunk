//ListingTitle.js//

const React = require('react');

class ListingTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'value': props.value
    };
  }

  render() {
    return (
      <div style={{
        'backgroundColor': '#ecf0f1',
        'borderRadius': '5px',
      }}
        >
        <h2 style={{'padding': '3px'}}>{this.state.value}</h2>
      </div>
    );
  }
};

module.exports = ListingTitle;