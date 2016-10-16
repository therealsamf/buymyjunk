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
      'verfiy': false,
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
  }

  verify(){

    var _this = this;

    var fail = function(){
      _this.refs.FailModal.open();
      setTimeout(_this.refs.FailModal.close, 3000);
    }

    var success = function(response){
      // console.log('LoginModal Auth success method called');
      console.log('ResponseMessage: ' + response.message);
      if (response.message !== 'fail') {
        _this.setState({
          'successModalValue': 'Verified'
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
      console.log("authenticated");
      this.setState({'authenticate': true});
      var _this = this;

      var fail = function(){
        _this.refs.FailModal.open();
        setTimeout(_this.refs.FailModal.close, 3000);
      }

      var success = function(response){
        // console.log('LoginModal Auth success method called');
        console.log('ResponseMessage: ' + response.message);
        if (response.message !== 'fail') {
          _this.setState({
            'successModalValue': 'Email Sent'
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
              <Form horizontal style={{'textAlign': 'center', 'marginRight': '35%'}}>
                 <FormGroup controlId={"formHorizontalEmail"}>
                    <Col componentClass={ControlLabel} sm={2}>
                       Email
                    </Col>
                    <Col sm={8}>
                        <input type="txt" value={this.state.value} onChange={this.handleChange}> 
                        </input>
                      <Button bsStyle={'primary'} onClick={this.auth.bind(this)}>
                          Authenticate
                       </Button>
                    </Col>  
                  </FormGroup>
                   <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                       Verify
                    </Col>
                    <Col sm={10}>
                      <input type="txt" value={this.state.value} onChange={this.changeVerify}> 
                        </input>
                      <Button bsStyle={'primary'} disabled={false/*!this.state.authenticate*/} onClick={this.verify.bind(this)}>
                          Verify
                       </Button>  
                    </Col>
                  </FormGroup>
                   <FormGroup controlId="formHorizontalEmail" >
                    <Col componentClass={ControlLabel} sm={2}>
                       Username
                    </Col>
                    <Col sm={10} disabled ="true">
                      <FormControl type="email" placeholder="Username" />
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
             </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Cancel</Button>
          <Button bsStyle="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
      
    );
  }
}

module.exports = LoginModal;