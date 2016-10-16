//ImageList.js//

const React = require('react');
const {ListGroup, ListGroupItem, Image} = require('react-bootstrap');

const MAX_IMAGE_WIDTH = '250px',
  MAX_IMAGE_HEIGHT = '250px';

class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'urls': props.imageURLS
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      'urls': nextProps.imageURLS
    });
  }

  render() {

    var images = new Array();
    if (this.state.urls) {
      for (var i = 0; i < this.state.urls.length; i++) {
        var url = this.state.urls[i];
        if (!url || url.length <= 0)
          continue;
        images.push(
          <ListGroupItem key={i}>
            <Image 
              style={{
                'maxWidth': '100%', 
                'maxHeight': MAX_IMAGE_HEIGHT,
              }}
              src={url} 
              rounded 
            />
          </ListGroupItem>
        );
      }
    }

    return (
      <div style={{'maxHeight': screen.height, 'boxShadow': '3px 5px 5px 5px #95a5a6'}}>
        <ListGroup style={{'maxHeight': '450px', 'overflowY': 'scroll'}}>
          {images}
        </ListGroup>
      </div>
    );
  }
};

module.exports = ImageList;