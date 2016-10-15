
const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const {Jumbotron} = ReactBootstrap;
const ReactDom = require('react-dom');


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <Jumbotron>
        <h1>{'Buy My Junk!'}</h1>
      </Jumbotron>
    );
  }
};

ReactDom.render(<HomePage />, document.getElementById('body'));