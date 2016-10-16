
const React = require('react');
const ReactDom = require('react-dom');
const ReactBootstrap = require('react-bootstrap');

const {Jumbotron, FormGroup, ControlLabel, HelpBlock, FormControl, 
  Modal, Form, Col, Checkbox, Button, ListGroupItem, ListGroup} = ReactBootstrap;

const Styles = require('./style.js');

const LoginModal = require('./LoginModal.js');
const NewListingModal = require('./NewListingModal.js');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false
    };
  }

  cancel() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    var _this = this;
    return(
      <Jumbotron style={{'backgroundColor': '#27ae60', 'textAlign': 'center', 'minWidth': '100%', 'minHeight': screen.height.toString() + 'px'}}>
        <h1 style={Styles.container}>{'Buy My Junk!'}</h1>
         <Form horizontal style={{'textAlign': 'center', 'marginRight': '15%'}}>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                 Email
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle={'primary'}>
                  Sign in
                </Button>
                {' '}
                <Button bsStyle={"primary"}  onClick={function() {
                  if (_this.refs.LoginModal) {
                    _this.refs.LoginModal.open();
                  }
                }}>
                  Sign Up
                </Button>
                <Button bsStyle={'info'} onClick={function() {
                  if (_this.refs.NewListingModal) {
                    _this.refs.NewListingModal.open();
                  }
                }}>
                  {'New Listing!'}
                </Button>        
              </Col>
            </FormGroup>
          </Form>
          <LoginModal ref={'LoginModal'} />
          <NewListingModal ref={'NewListingModal'} />
          <h2>Items Sold</h2>
          <span>
            <ul >
              <a href="/category?v=Textbooks">Textbooks</a>
            </ul>
          </span>
            <ul>
              <a href="/category?v=Furniture">Furniture</a>
            </ul>
            <ul>
               <a href="/category?v=Appliances">Appliances</a>
            </ul>
          <ListGroup 
            style={{
              'backgroundColor': '#27ae60', 
              'textAlign': 'center', 
              'minWidth': '60%', 
              'minHeight': screen.height.toString() + 'px'
            }}  
          >
            <ListGroupItem>
              <a href="/listing?v=fdakj">Listings</a>
            </ListGroupItem>
            <ListGroupItem>
              <a href="/category?v=Textbooks">Textbooks</a>
            </ListGroupItem>
            <ListGroupItem>
              <a href="/category?v=Furniture">Furniture</a>
            </ListGroupItem>
            <ListGroupItem>
              <a href="/category?v=Appliances">Appliances</a>
            </ListGroupItem>
          </ListGroup>
         </Jumbotron>
    );
  }
};

ReactDom.render(<HomePage />, document.getElementById('body'));
