
const React = require('react');
const {Modal, Button} = require('react-bootstrap');

class SuccessModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    console.log('SuccessModal opening');
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
                <b>{this.props.value}</b>
            </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

module.exports = SuccessModal;