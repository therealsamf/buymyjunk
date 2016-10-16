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
    var title = this.state.value.substr(0, 1).toUpperCase() + this.state.value.substr(1);
    return (
      <div style={{
        'fontSize': '20px', 
        'fontWeight': 'bold', 
        'backgroundColor': '#ecf0f1', 
        'borderRadius': '5px',
      }}>
        <span style={{'padding': '5px'}}>{title}</span>
      </div>
    );
  }
}

module.exports = CategoryTitle;