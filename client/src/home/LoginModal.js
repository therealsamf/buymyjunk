//LoginModal.js//

const React = require('react');
const {Modal, Col, Row, FormControl, FormGroup, ControlLabel, ToDo, Form, Button} = require('react-bootstrap');

var utils = require('../../../utils/utils.js');

var FailModal = require('./FailModal.js');
var SuccessModal = require('./SuccessModal.js');

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false,
      'authenticate': false,               
      'verify': false,
      'email': '',
      'verifyCode': '',
      'UUID': utils.getUUID()
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeVerify = this.changeVerify.bind(this);
    this.auth = this.auth.bind(this);
    this.verify = this.verify.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.createUser = this.createUser.bind(this);
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

  verify(){

    var _this = this;

    var fail = function(){
      _this.refs.FailModal.open();
      setTimeout(_this.refs.FailModal.close, 3000);
    }

    var success = function(response){
      // console.log('LoginModal Auth success method called');
      if (response.message !== 'fail') {
        _this.setState({
          'successModalValue': 'Verified',
          'verify': true
        });
        _this.refs.SuccessModal.open();
        setTimeout(_this.refs.SuccessModal.close, 1500);
      }
      else {
        fail();
      }
    } 
    utils.verifyUUID(this.state.verifyCode, success, fail);
  }


  auth(){
    if (!this.state.authenticate && utils.validEmail(this.state.email)) {
      var _this = this;

      var fail = function(){
        _this.refs.FailModal.open();
        setTimeout(_this.refs.FailModal.close, 3000);
      }

      var success = function(response){
        // console.log('LoginModal Auth success method called');
        if (response.message !== 'fail') {
          _this.setState({
            'successModalValue': 'Email Sent',
            'authenticate': true
          });
          _this.refs.SuccessModal.open();
          setTimeout(_this.refs.SuccessModal.close, 1500);
        }
        else {
          fail();
        }
      }

      utils.emailUUID(this.state.email, '', this.state.UUID);
      utils.storeUUID(this.state.UUID, success, fail);
    }
  }

  createUser() {
    var _this = this;

    var fail = function() {
      if (_this.refs.FailModal) {
        _this.refs.FailModal.open();
        setTimeout(function() {
          _this.refs.FailModal.close();
          _this.close();
        }, 2000);
      }
    }

    if (this.state.password.length <= 0) {
      return;
    }

    utils.addUser(
      this.state.username, 
      this.state.password, 
      this.state.email, 
      'UT Austin',
      function(response) {
        // console.log('Response: ');
        // console.dir(response);
        // console.log('ResponseMessage: ' + response.message);
        if (response && response.message.toLowerCase() !== 'fail') {
          _this.setState({
            'successModalValue': 'User Added!'
          });
          if (_this.refs.SuccessModal) {
            _this.refs.SuccessModal.open();
          }
          setTimeout(function() {
            _this.refs.SuccessModal.close();
            _this.close();
          }, 1500);
        }
        else {
          fail();
        }
      },
      fail
    );
  }

  handleChange(event) {
    this.setState({
      'email': event.target.value
    });
  }

  changeVerify(event){
    this.setState({
      'verifyCode': event.target.value
    });
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

  render() {
    return (
      <Modal show={this.state.showModal}>
        <FailModal ref={'FailModal'} />
        <SuccessModal value={this.state.successModalValue} ref={'SuccessModal'} />
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Form horizontal style={{'textAlign': 'center', 'marginRight': '15%'}}>
                 <FormGroup controlId={"formHorizontalEmail"}>
                    <Col componentClass={ControlLabel} sm={1}>
                       Email
                    </Col>
                    <Col sm={8}>
                        <input type="txt" value={this.state.email} onChange={this.handleChange}> 
                        </input>
                        {'         '}
                      <Button bsStyle={'primary'} onClick={this.auth.bind(this)}>
                          Authenticate
                       </Button>
                    </Col>  
                  </FormGroup>
                   <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={1}>
                       Verify
                    </Col>
                    <Col sm={8}>
                      <input type="txt" value={this.state.verifyCode || ''} onChange={this.changeVerify}> 
                        </input>
                          {'     '}
                      <Button bsStyle={'primary'} disabled={!this.state.authenticate} onClick={this.verify}>
                          Verify
                       </Button>  
                    </Col>
                  </FormGroup>
                   <FormGroup controlId="formHorizontalEmail" >
                    <Col componentClass={ControlLabel} sm={2}>
                       Username
                    </Col>
                    <Col sm={10}>
                      <FormControl 
                        type="text" 
                        placeholder="Username" 
                        value={this.state.username || ''} 
                        onChange={this.updateUsername}
                        disabled={!this.state.verify}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl 
                      type="password" 
                      placeholder="Password" 
                      value={this.state.password || ''} 
                      onChange={this.updatePassword}
                      disabled={!this.state.verify}
                    />
                  </Col>
                </FormGroup>
             </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Cancel</Button>
          <Button bsStyle="primary" onClick={this.createUser}>Submit</Button>
        </Modal.Footer>
      </Modal>
      
    );
  }
}

module.exports = LoginModal;