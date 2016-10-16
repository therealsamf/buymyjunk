//Description.js//

const React = require('react');
const {Label} = require('react-bootstrap');

class Description extends React.Component {
  


  render() {
    var tags = new Array();
    var key = 0,
      index = 0;
    if (this.props.tags) {
      for (var tag of this.props.tags) {
        if (!tag || tag.length <= 0)
          continue;
        tags.push(<Label key={key++}>{tag}</Label>)
        index++;
        if (index < this.props.tags.length) {
          tags.push(<span key={key++}>{' '}</span>);
        }
      }
    }
    return (
      <div style={{
        'boxShadow': '3px 5px 5px 5px #95a5a6', 
        'paddingLeft': '2px', 
        'paddingBottom': '5px',
        'overflowY': 'scroll',
        'minHeight': '400px',
        'maxHeight': '400' + 'px',
        'backgroundColor': '#ecf0f1',
        'fontSize': '15px'
      }}>
        {this.props.text}
        <span><span><h6>{'Tags: '}</h6></span>{tags}</span>
      </div>
    );
  }
};

module.exports = Description;