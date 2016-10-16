//LoginModal.js//

const React = require('react');
const {Modal, Col, Row, FormControl, FormGroup, ControlLabel, ToDo, Form, Button} = require('react-bootstrap');

var utils = require('../../../utils/utils.js');

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false,
      'authenticate': false,               
      'verfiy': false,
      'email': ''
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.auth = this.auth.bind(this);
  }

  auth(){
    if (!this.state.authenticate && utils.validEmail(this.state.email)) {
        console.log("authenticated");
        this.setState({'authenticate': true});
    }
  }

  handleChange(event) {
    this.state.email = event.target.value;
    console.log(this.state.email);
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
                      <FormControl type="email" placeholder="Verifcation Code" disabled={!this.state.authenticate} />
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