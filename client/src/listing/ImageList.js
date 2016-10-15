//ImageList.js//

const React = require('react');
const {ListGroup, ListGroupItem, Image} = require('react-bootstrap');

class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'urls': props.imageURLS
    };
  }

  render() {
    var images = new Array();
    for (var i = 0; i < this.state.urls.length(); i++) {
      var url = this.state.urls[i];
      images.push(<ListGroupItem key={i}><Image src={url} rounded /></ListGroupItem>);
    }

    return (
      <div style={{'maxHeight': screen.height, 'overflowY': 'scroll'}}>
        <ListGroup>
          {images}
        </ListGroup>
      </div>
    );
  }
};

module.exports = ImageList;