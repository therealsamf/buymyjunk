//CategoryTitle.js//

const React = require('react');

class CategoryTitle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'value': props.title
    };
  }



  render() {
    return (
      <div>
        {this.state.value}
      </div>
    );
  }
}

module.exports = CategoryTitle;