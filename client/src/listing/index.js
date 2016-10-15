
//node imports
const React = require('react');
const ReactDom = require('react-dom');
const {Grid, Col, Row} = require('react-bootstrap');

//user imports
const ImageList = require('./ImageList.js');
const ListingTitle = require('./ListingTitle.js');
const Description = require('./Description.js');

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'imageURLS': props.imageURLS,
      'description': props.description,
      'user': props.user,
      'tags': props.tags,
      'title': props.title
    };
  }

  render() {
    return (
      <Grid>
        <Col  md={3}>
          <ImageList imageURLS={this.state.imageURLS} />
        </Col>
        <Col md={6}>  
          <ListingTitle style={{'marginTop': '25%'}} value={this.state.title} />
          <Description text={this.state.description} tags={this.state.tags} />
        </Col>
        <Col md={3}>{'&nbsp'}</Col>
      </Grid>
    );
  }
}

ReactDom.render(<Listing />, document.getElementById('body'));