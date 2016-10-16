
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
    var query = QueryState();
    this.setState({
      'category': query.v
    });

    console.log('Query: ');
    console.dir(QueryString());

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

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}

ReactDom.render(<CategoryPage />, document.getElementById('body'));