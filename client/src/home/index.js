
const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const {Jumbotron, FormGroup, ControlLabel, HelpBlock, FormControl} = ReactBootstrap;
const ReactDom = require('react-dom');


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'value': ''
    };
  }

  handleChange(e) {
    this.setState({ 'value': e.target.value });
  }

  render() {
    return(
      <form>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Working example with validation</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange.bind(this)}
            />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
};

ReactDom.render(<HomePage />, document.getElementById('body'));