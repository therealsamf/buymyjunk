
const React = require('react');
const ReactDom = require('react-dom');
const ReactBootstrap = require('react-bootstrap');

const {Jumbotron, FormGroup, ControlLabel, HelpBlock, FormControl, 
  Modal, Form, Col, Checkbox, Button, ListGroupItem, ListGroup, Table} = ReactBootstrap;

const Styles = require('./style.js');

const LoginModal = require('./LoginModal.js');
const NewListingModal = require('./NewListingModal.js');
const FailModal = require('./FailModal.js');
const utils = require('../../../utils/utils.js');
const Categories = require('../category/Categories.js');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false,
      'username': '',
      'password': '',
      'signedIn': false
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);

    this.signIn = this.signIn.bind(this);
  }

  updateUsername(e) {
    this.setState({
      'username': e.target.value
    });
  }

  updatePassword(e) {
    this.setState({
      'password': e.target.value
    });
  }

  signIn() {
    var _this = this;
    var fail = function() {
      if (_this.refs.FailModal) {
        _this.refs.FailModal.open();
        setTimeout(function() {
          _this.refs.FailModal.close();
        }, 2000);
      }
    }

    var username = this.state.username;
    var password = this.state.password;
    utils.login(username, password, 
      function(response) {
        // console.log('Response: ');
        // console.dir(response);
        // console.log('ResponseMessage: ' + response.message);
        if (response &&  response.email !== undefined) {
          _this.setState({
            'signedIn': true
          });
        }
        else {
          fail();
        }
      },
      fail
    );
  }

  cancel() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    var cols = new Array();
    for (var i = 0; i < 3; i++) {
      var rows = new Array();
      for (var t = 0; t < 3; t++) {
        var index = i * 3 + t;
        let category = Categories[index];
        category = category.substr(0, 1).toUpperCase() + category.substr(1);
        rows.push(
          <td 
            key={t} 
            style={{'fontWeight': 'bold', 'fontSize': '14px', 'backgroundColor': '#2ecc71'}}
            onClick={function() {window.location.href = '/category?cat=' + category}}
          >
            {category}
          </td>);
      }
      cols.push(<tr key={i}>{rows}</tr>);
    }
    var table = <Table bordered style={{'maxWidth': '75%', 'margin': 'auto'}}><tbody>{cols}</tbody></Table>;
    var _this = this;
    return(
      <Jumbotron style={{'backgroundColor': '#27ae60', 'textAlign': 'center', 'minWidth': '100%', 'minHeight': screen.height.toString() + 'px'}}>
        <FailModal ref={'FailModal'} />
        <h1 style={Styles.container}>{'Buy My Junk!'}</h1>
         <Form horizontal style={{'textAlign': 'center', 'marginRight': '15%'}}>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                 {'Username'}
              </Col>
              <Col sm={10}>
                <FormControl 
                  type="text" 
                  placeholder="Username" 
                  value={this.state.username}
                  onChange={this.updateUsername}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                {'Password'}
              </Col>
              <Col sm={10}>
                <FormControl 
                  type="password" 
                  placeholder="Password" 
                  value={this.state.password}
                  onChange={this.updatePassword}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle={'primary'} onClick={this.signIn}>
                  {'Sign in'}
                </Button>
                {' '}
                <Button bsStyle={"primary"}  onClick={function() {
                  if (_this.refs.LoginModal) {
                    _this.refs.LoginModal.open();
                  }
                }}>
                  {'Sign Up'}
                </Button>
                  {' '}
                <Button disabled={!this.state.signedIn} bsStyle={'info'} onClick={function() {
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
          {table}
         </Jumbotron>
    );
  }
};

ReactDom.render(<HomePage />, document.getElementById('body'));
