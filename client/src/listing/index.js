
//node imports
const React = require('react');
const ReactDom = require('react-dom');
const {Grid, Col, Row} = require('react-bootstrap');

//user imports
const ImageList = require('./ImageList.js');
const ListingTitle = require('./ListingTitle.js');
const Description = require('./Description.js');
const Logo = require('./Logo.js');

const utils = require('../../../utils/utils.js');

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


  componentWillMount() {
    var queryString = QueryString();
    var _this = this;
    utils.getPostById(queryString.id, 'UT Austin', 
      function(response) {
        ;
        var post = response.post[0];
        
        _this.setState({
          'description': post.description,
          'tags': [post.tag_1, post.tag_2, post.tag_3, post.tag_4, post.tag_5, post.tag_6, post.tag_7,
            post.tag_8, post.tag_9, post.tag_10],
          'title': post.title,
          'user': post.username,
          'imageURLS': [post.image_1, post.image_2, post.image_3, post.image_4, post.image_5]
        });
      }, 
      function() {
        // console.error('Failed');

      }
    );
    // this.setState({
    //   'imageURLS': [
    //     'http://www.utexas.edu/sites/www.utexas.edu/files/styles/utexas_hero_photo_image/public/tower_hero_v2.jpg',
    //     'http://static.ddmcdn.com/en-us/apl/breedselector/images/breed-selector/dogs/breeds/dachshund-standard_01_lg.jpg',
    //     'http://livex.poynter.org/wp-content/uploads/2015/06/Screen-Shot-2015-06-08-at-4.29.14-PM.png',
    //     'https://upload.wikimedia.org/wikipedia/commons/5/54/WaterMill_Window_LymeRegis.jpg'
    //   ],
    //   'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia, felis tincidunt convallis maximus, purus felis lobortis ligula, vitae interdum turpis justo eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus feugiat erat pharetra ipsum condimentum tincidunt. Donec vestibulum massa nec nibh molestie condimentum. Vestibulum massa leo, volutpat a egestas nec, dapibus venenatis sapien. Maecenas nec sollicitudin urna, a interdum justo. Nunc congue, enim sit amet mattis vulputate, nunc ligula volutpat augue, vitae sagittis leo nisl non mauris.' +
    //     'Aenean vehicula, felis et egestas placerat, nisl ex dignissim nisl, non bibendum sapien arcu in mauris. Duis vitae interdum turpis. Phasellus pellentesque facilisis justo, in placerat urna auctor eu. Donec dignissim nisl velit, eget tristique justo elementum nec. Mauris risus nisl, ultrices ut purus sed, aliquam egestas tortor. Praesent ac tempus arcu. Curabitur lacus dolor, pellentesque quis augue vel, tincidunt tempus sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam facilisis nisi in sem vestibulum feugiat.' +
    //     'Aliquam porttitor sem quis turpis suscipit volutpat. Nullam non feugiat purus. Phasellus faucibus pharetra suscipit. Integer viverra tincidunt purus ac accumsan. Nunc tellus metus, vehicula in odio non, convallis finibus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi eget ipsum a nulla commodo fermentum id quis orci. Quisque egestas libero dolor, iaculis bibendum eros blandit vel. Pellentesque sit amet orci sem. Integer id sapien at massa consectetur blandit.' +
    //     'Mauris vehicula ut lectus sit amet vulputate. Suspendisse lorem sapien, iaculis a fringilla at, tempor sed tellus. Suspendisse lobortis mattis justo, ac vulputate arcu iaculis nec. Aenean convallis lacinia felis in interdum. Sed dignissim elit a tincidunt accumsan. Mauris laoreet fermentum sapien eget iaculis. Maecenas eu libero egestas, aliquam urna sed, pharetra metus. Phasellus sapien ipsum, porttitor sit amet dignissim id, blandit et leo. Donec ullamcorper sapien ac rhoncus luctus. Curabitur iaculis ipsdsum eget malesuada venenatis. Maecenas eu egestas sapien. Nullam pellentesque purus in lorem aliquet sagittis. Proin facilisis efficitur elementum. Suspendisse lacinia erat dui, non varius nunc aliquam sit amet. Morbi lacinia ornare est ac volutpat. Fusce egestas orci vel purus imperdiet, eu vehicula augue luctus.' +
    //     'Phasellus tellus quam, gravida non neque vel, rutrum semper eros. Cras quis posuere neque. Quisque fringilla mi rhoncus aliquet rhoncus. Praesent consectetur lacus id arcu suscipit, ac mattis libero placerat. Mauris vulputate faucibus lorem, eget tincidunt neque bibendum quis. Phasellus non volutpat mauris. Curabitur sagittis ante vitae egestas accumsan.',
    //   'user': 'Sam_Faulkner',
    //   'tags': ['book', 'good'],
    //   'title': 'A good book'
    // });
  }

  render() {
    return (
      <Grid style={{'backgroundColor': '#27ae60'}}>
        <Col  md={3}>
          <Logo />
          <ImageList imageURLS={this.state.imageURLS} />
        </Col>
        <Col md={6}>  
          <ListingTitle style={{'marginTop': '25%'}} value={this.state.title} />
          <Description text={this.state.description} tags={this.state.tags} />
        </Col>
        <Col md={3}></Col>
      </Grid>
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

ReactDom.render(<Listing />, document.getElementById('body'));