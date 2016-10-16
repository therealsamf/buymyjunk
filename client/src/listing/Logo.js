//Logo.js//

const React = require('react');
const {Jumbotron} = require('react-bootstrap');

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <Jumbotron 
          style={{
            'fontSize': '20px', 
            'fontWeight': 'bold', 
            'maxHeight': '120px', 
            'backgroundColor': '#ecf0f1',
            
          }}
        >
          {'Buy My Junk!'}
        </Jumbotron>
      </div>
    );
  }
}

module.exports = Logo;