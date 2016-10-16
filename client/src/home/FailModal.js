
const React = require('react');
const {Modal, Button} = require('react-bootstrap');

class FailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'showModal': false
    };

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
        <FailModal ref={'FailModal'} />
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <b>failed</b>
            </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

module.exports = FailModal;