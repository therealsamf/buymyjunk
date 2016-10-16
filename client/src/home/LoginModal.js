//LoginModal.js//

const React = require('react');
const {Modal, Col, Row, FormControl, FormGroup, ControlLabel, ToDo, Form, Button} = require('react-bootstrap');

var utils = require('../../../utils/utils.js');

var FailModal = require('./FailModal.js');

var SucessModal = require('./SuccessModal.js');

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false,
      'authenticate': false,               
      'verfiy': false,
      'email': '',
      'verifyCode': '',
      'UUID': utils.getUUID
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeVerify = this.changeVerify.bind(this);
    this.auth = this.auth.bind(this);
  }

  auth(){
    if (!this.state.authenticate && utils.validEmail(this.state.email)) {
        console.log("authenticated");
        this.setState({'authenticate': true});
    
        var fail = function(){
          this.refs.FailModal;
          this.refs.FailModal.open;
          setTimeout(this.refs.FailModal,300);
          this.refs.FailModal.close;
        }

        var success = function(){
            this.refs.FailModal;
          this.refs.FailModal.open;
        }

        utils.emailUUID(this.state.email,'',this.state.UUID);
        utils.storeUUID(this.state.UUID, {success}, {fail});
    }
  }

  handleChange(event) {
    this.state.email = event.target.value;
  }

  changeVerify(event){
    this.state.verifyCode = event.target.value;
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
                      <input type="txt" value={this.state.value} onChange={this.verifyCode}> 
                        </input>
                      <Button bsStyle={'primary'} disabled={!this.state.authenticate}>
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