
const React = require('react');
const ReactDom = require('react-dom');
const {Grid, Col, Row} = require('react-bootstrap');

const CategoryList = require('./CategoryList.js');
const CategoryTitle = require('./CategoryTitle.js');
const ListingList = require('./ListingList.js');

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'category': null
    };
  }

  componentWillMount() {
    this.setState({
      'category': 'texbooks'
    })
  }

  render() {
    return (
      <div>
        <Grid>
          <Col>
            <CategoryList />
          </Col>
          <Col>
            <Row>
              <CategoryTitle value={this.state.category} />
            </Row>
            <Row>
              <ListingList category={this.state.category}/>
            </Row>
          </Col>
        </Grid>
      </div>
    );
  }
}

ReactDom.render(<CategoryPage />, document.getElementById('body'));