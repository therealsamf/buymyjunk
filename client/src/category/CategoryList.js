//CategoryList.js//

const React = require('react');
const {ListGroup, ListGroupItem} = require('react-bootstrap');

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'categories': null
    };
  }

  render() {
    var listings = new Array();
    var key = 0;
    for (var category of this.state.categories) {
      listings.push(<CategoryListItem key={key++} value={category} />);
    }

    return (
      <div>
        {listings}
      </div>
    );
  }
}

/**
 * @description - This class will probably see more 
 * information added to it later
 */
class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'value': props.value
    };
  }

  render() {
    return (
      <ListGroupItem>
        {this.state.value}
      </ListGroupItem>
    );
  }
}

module.exports = CategoryList;