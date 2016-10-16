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
    var dumbWords = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non commodo justo. Phasellus finibus sit amet tellus et condimentum. Cras auctor purus a turpis congue luctus. Donec auctor ut tellus quis molestie. Sed nec diam eget erat aliquet malesuada. Proin faucibus pretium rutrum. Curabitur venenatis posuere lorem volutpat ullamcorper. Nam in massa pulvinar, viverra risus a, viverra tortor. Nunc imperdiet pellentesque nulla, vel finibus sem rutrum et. Integer mollis nunc nec nunc aliquet gravida. Vestibulum vehicula dapibus tristique. Proin pretium metus in ante commodo mattis. Sed arcu sapien, bibendum sit amet dolor vitae, tempus blandit erat. Aenean et quam in purus tempor molestie. Ut massa purus, dapibus quis tristique vitae, efficitur eu odio.';
    dumbWords = dumbWords.split(' ');

    var newListings = new Array();
    for (var i = 0; i < 10; i++) {
      newListings.push(<ListGroupItem key={i}>{dumbWords[i]}</ListGroupItem>);
    }

    this.setState({
      'listings': newListings
    });
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

module.exports = ListingList;