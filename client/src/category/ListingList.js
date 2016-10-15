//ListingList.js//

const React = require('react');
const {ListGroup, ListGroupItem} = require('react-bootstrap');

class ListingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'category': props.category,
      'listings': new Array()
    }
  }

  componentWillMount() {
    
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.listings}
        </ListGroup>
      </div>
    );
  }
}