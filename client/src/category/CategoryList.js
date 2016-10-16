//CategoryList.js//

const React = require('react');
const {ListGroup, ListGroupItem} = require('react-bootstrap');

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'categories': require('./Categories.js')
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
    var _this = this;
    var cat = _this.state.value.substr(0, 1).toUpperCase() + _this.state.value.substr(1);

    return (
      <ListGroupItem onClick={
        function() {
          window.location.href = '/category?cat=' + cat;
        }}
      >
        {cat}
      </ListGroupItem>
    );
  }
}

module.exports = CategoryList;