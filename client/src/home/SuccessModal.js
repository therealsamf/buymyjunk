
const React = require('react');
const {Modal, Button} = require('react-bootstrap');

class SuccessModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false
    };
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
                <b>verified</b>
            </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

module.exports = SuccessModal;