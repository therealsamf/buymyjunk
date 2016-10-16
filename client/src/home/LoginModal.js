//LoginModal.js//

const React = require('react');
const {Modal, Col, Row, FormControl, FormGroup, ControlLabel, Form, Button} = require('react-bootstrap');

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
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
              <Form horizontal style={{'textAlign': 'center', 'marginRight': '15%'}}>
                 <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                       Email
                    </Col>
                    <Col sm={10}>
                      <FormControl type="email" placeholder="Email" />
                    </Col>
                  </FormGroup>
                   <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                       Verify
                    </Col>
                    <Col sm={10}>
                      <FormControl type="email" placeholder="Verifcation Code" />
                    </Col>
                  </FormGroup>
                   <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                       Username
                    </Col>
                    <Col sm={10}>
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