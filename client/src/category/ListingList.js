//ListingList.js//

const React = require('react');
const {ListGroup, ListGroupItem} = require('react-bootstrap');

const utils = require('../../../utils/utils.js');

class ListingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'category': props.category,
      'listings': new Array()
    }
  }

  componentWillMount() {
    var _this = this;
    utils.getPostsByFilter('UT Austin', this.state.category, null, 
      function(response) {
        // console.log('Response');
        // console.dir(response);
        _this.setState({
          'listings': response
        });
      },
      function() {
        console.error('Failed to get listings for category: ' + this.state.category.toString());
      }
    );
  }

  render() {
    var listings = new Array();
    var key = 0;
    for (let listing of this.state.listings) {
      listings.push(
        <ListGroupItem 
          onClick={function() {window.location.href = '/listing?id=' + listing.id.toString();}}
          key={key++}
        >
          <span>
            <span className={'text-info'}>{listing.title}</span>
            {' '}
            <span style={{'maxWidth': '80%', 'fontSize': '10px'}} className={'text-muted'}>{listing.description}</span>
          </span>
        </ListGroupItem>
      );
    }
    return (
      <div>
        <ListGroup style={{'maxHeight': '450px', 'overflowY': 'scroll', 'boxShadow': '3px 5px 5px 5px #95a5a6'}}>
          {listings}
        </ListGroup>
      </div>
    );
  }
}

module.exports = ListingList;