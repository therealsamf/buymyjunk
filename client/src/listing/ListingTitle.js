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
      <div>
        <h2>{this.state.value}</h2>
      </div>
    );
  }
};

module.exports = ListingTitle;