//NewListingModal.js//

const React = require('react');
const {Modal, Button, Form, FormGroup, ControlLabel, HelpBlock,
  FormControl, ListGroupItem, ListGroup, MenuItem, DropdownButton} = require('react-bootstrap');

const utils = require('../../../utils/utils.js');
const FailModal = require('./FailModal.js');
const SuccessModal = require('./SuccessModal.js');

const categories = require('../category/Categories.js');

class NewListingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false
    };

    this.imageSlotKey = 0;
    this.tagSlotKey = 0;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.updateListingName = this.updateListingName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateCategory = this.updateCategory.bind(this);

    this.addImageURL = this.addImageURL.bind(this);
    this.addTag = this.addTag.bind(this);
    this.postListing = this.postListing.bind(this);
  }

  open() {
    if (!this.state.showModal) {
      this.setState({
        'showModal': true
      });
    }
  }

  close() {
    if (this.state.showModal) {
      this.setState({
        'showModal': false
      });
    }
  }

  componentWillMount() {
    //Add some images and tags
    for (var i = 0; i < 3; i++) {
      this.addImageURL();
    }

    for (var i = 0; i < 3; i++) {
      this.addTag();
    }


  }

  updateListingName(e) {
    this.setState({
      'listingName': e.target.value
    });
  }

  updateDescription(e) {
    this.setState({
      'description': e.target.value
    });
  }

  addImageURL() {
    var imageURLSlots = this.state.imageURLSlots;
    if (!imageURLSlots) {
      imageURLSlots = new Array();
    }
    if (imageURLSlots.length >= 5) {
      return;
    }
    imageURLSlots.push(
      ''
    );
    this.setState({
      'imageURLSlots': imageURLSlots
    });
  }

  addTag() {
    var tags = this.state.tagSlots;
    if (!tags) {
      tags = new Array();
    }
    if (tags.length >= 10) {
      return;
    }
    tags.push('');
    this.setState({
      'tagSlots': tags
    });
  }

  updateCategory(value) {
    this.setState({
      'category': value
    });
  }

  postListing() {
    var description = this.state.description;
    // var user = utils.getUser();
    var listingName = this.state.listingName;
    var category = this.state.category;
    var tags = new Array();
    var tagIndex = 0;
    while (tagIndex < this.tagSlotKey) {
      var tagSlot = this.refs['TagSlot' + tagIndex.toString()];
      if (tagSlot && tagSlot.getValue().length > 0) {
        var tagValue = tagSlot.getValue();
        if (tagValue.length > 1)
          tagValue = tagValue.substr(0, 1).toUpperCase() + tagValue.substr(1);
        tags.push(tagValue);
      }
      tagIndex++;
    }

    var images = new Array();
    var imageIndex = 0;
    while (imageIndex < this.imageSlotKey) {
      var imageSlot = this.refs['ImageSlot' + imageIndex.toString()];
      if (imageSlot && imageSlot.getValue().length > 0) {
        images.push(imageSlot.getValue());
      }
      imageIndex++;
    }

    var _this = this;
    utils.addPost(utils.getUUID(), 'UT Austin', "sf", listingName, 
      description, category, tags, images,
      function(response) { //success function
        if (response.message && response.message.toLowerCase() !== 'fail') {
          _this.setState({
            'successModalValue': 'Posting Listed!'
          });
          _this.refs.SuccessModal.open();
          setTimeout(function() {_this.refs.SuccessModal.close(); _this.close()}, 1500);
        }
        else {
          _this.refs.FailModal.open();
          setTimeout(function() {_this.refs.FailModal.close(); _this.close()}, 1500);
        }
      },
      function() { //failure function
        _this.refs.FailModal.open();
        setTimeout(function() {_this.refs.FailModal.close(); _this.close()}, 1500);
      }
    );
  }

  render() {
    var tags = new Array();
    this.tagSlotKey = 0;
    // console.log('TagSlots');
    // console.dir(this.state.tagSlots);
    for (var tag of this.state.tagSlots) {
      tags.push(<TagSlot 
        key={this.tagSlotKey++}
        ref={'TagSlot' + this.tagSlotKey.toString()}
        value={tag}
      />);
      this.tagSlotKey++;
    }

    var images = new Array();
    this.imageSlotKey = 0;
    for (var image of this.state.imageURLSlots) {
      images.push(
        <ImageURLSlot 
          key={this.imageSlotKey++} 
          ref={'ImageSlot' + this.imageSlotKey.toString()}
          value={image}
        />
      );
      this.imageSlotKey++;
    }
    var _this = this;

    var menuItems = new Array();
    var key = 0;
    for (let category of categories) {
      category = category.substr(0, 1).toUpperCase() + category.substr(1);
      menuItems.push(
        <MenuItem 
          eventKey={key}
          key={key++}
          id={category}
          onSelect={function() {
            _this.updateCategory(category);
          }}
        >
          {category}
        </MenuItem>
      );
    }

    return(
      <Modal show={this.state.showModal}>
        <FailModal ref={'FailModal'} />
        <SuccessModal value={this.state.successModalValue} ref={'SuccessModal'} />
        <Modal.Header closeButton>
          <Modal.Title>{'New Listing'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <FormGroup>
            <ControlLabel>{'Listing Name'}</ControlLabel>
            <FormControl
              type="text"
              value={this.state.listingName || ''}
              placeholder={'Listing Name'}
              onChange={this.updateListingName}
            />
            <HelpBlock>{'This will appear as the name of the listing'}</HelpBlock>
          </FormGroup>
          <FormGroup>
            <ControlLabel>{'Category'}</ControlLabel>
            <DropdownButton title={this.state.category || 'Select Category'} id={'Select Category'}>
              {menuItems}
            </DropdownButton>
            <HelpBlock>{'Category that this listing can be found under'}</HelpBlock>
          </FormGroup>
          <FormGroup>
            <ControlLabel>{'Description'}</ControlLabel>
            <FormControl 
              value={this.state.description || ''} 
              componentClass={'textarea'} 
              placeholder={"Listing's Description"} 
              onChange={this.updateDescription}
            />
            <HelpBlock>{'A description of your listing'}</HelpBlock>
          </FormGroup>
          <ControlLabel>{"Image URL's"}</ControlLabel>
          <ListGroup>
            {images}
          </ListGroup>
          <Button bsStyle={'primary'} onClick={this.addImageURL}>{'Add ImageURL'}</Button>
          <ControlLabel>{'Tags'}</ControlLabel>
          <ListGroup>
            {tags}
          </ListGroup>
          <Button bsStyle={'primary'} onClick={this.addTag}>{'Add Tag'}</Button>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle={'success'} onClick={this.postListing}>{'Post!'}</Button>
          <Button bsStyle={'danger'} onClick={this.close}>{'Cancel'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


class TagSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'value': props.value || ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      'value': e.target.value
    });
  }

  getValue() {
    return this.state.value;
  }

  render() {
    return(
      <ListGroupItem>
        <FormGroup>
          <ControlLabel>{'Tag'}</ControlLabel>
          <FormControl
            type={'text'}
            value={this.state.value}
            placeholder={'Tag'}
            onChange={this.handleChange}
          />
        </FormGroup>
      </ListGroupItem>
    );
  }
}

const URLRegex = new RegExp('(http://)*');

class ImageURLSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'value': props.value || ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  getValue() {
    return this.state.value;
  }

  handleChange(e) {
    this.setState({
      'value': e.target.value
    });
  }

  validURL() {
    var length = this.state.value.length;
    if (length > 0) {
      var valid = URLRegex.test(this.state.value);
      if (!valid) {
        return 'error';
      }
      else {
        return 'success'
      }
    }
  }

  render() {
    return(
      <ListGroupItem>
        <FormGroup validationState={this.validURL()}>
          <ControlLabel>{'Image URL'}</ControlLabel>
          <FormControl
            type={'text'}
            value={this.state.value}
            placeholder={'Image URL'}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </ListGroupItem>
    );
  }
}

module.exports = NewListingModal;