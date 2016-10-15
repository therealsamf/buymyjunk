
const React = require('react');
const ReactBootstrap = require('react-bootstrap');

const {Jumbotron, FormGroup, ControlLabel, HelpBlock, FormControl, Modal, Form, Col, Checkbox, Button} = ReactBootstrap;

const ReactDom = require('react-dom');

const Styles = require('./style.js');




class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false
    };
  }

  cancel() {
    console.log('Closing!');
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
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
                <Button bsStyle={"primary"}  onClick={this.open.bind(this)}>
                    Sign Up
                </Button>     
              </Col>
            </FormGroup>
          </Form>
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
              <Button onClick={this.cancel.bind(this)}>Cancel</Button>
              <Button bsStyle="primary">Submit</Button>
            </Modal.Footer>
          </Modal>
           
      </Jumbotron>
    );
  }
};

ReactDom.render(<HomePage />, document.getElementById('body'));
