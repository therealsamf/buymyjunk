//Description.js//

const React = require('react');
const {Label} = require('react-bootstrap');

class Description extends React.Component {
  

  render() {
    var tags = new Array();
    var key = 0,
      index = 0;
    for (var tag of this.props.tags) {
      tags.push(<Label key={key++}>{tag}</Label>)
      index++;
      if (index < this.props.tags.length()) {
        tags.push(<span key={key++}>{' '}</span>);
      }
    }
    return (
      <div style={{'boxShadow': '5px 5px 5px #888888'}}>
        {this.props.text}
        <span><span><h6>{'Tags: '}</h6></span>{tags}</span>
      </div>
    );
  }
};

module.exports = Description;