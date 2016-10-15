
const React = require('react');
const ReactBootstrap = require('react-bootstrap');

const {Jumbotron, FormGroup, ControlLabel, HelpBlock, FormControl} = ReactBootstrap;

const ReactDom = require('react-dom');

const Styles = require('./style.js');




class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return(
      <Jumbotron style={{'backgroundColor': '#27ae60', 'minWidth': '100%', 'minHeight': screen.height.toString() + 'px'}}>
        <h1 style={Styles.container}>{'Buy My Junk!'}</h1>
         <Form horizontal style={{'textAlign': 'center', 'minWidth': '80%'}}>
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
                <Button type="submit">
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
      
      </Jumbotron>
    );
  }
};

ReactDom.render(<HomePage />, document.getElementById('body'));
