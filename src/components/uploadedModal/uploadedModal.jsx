import React, { Component } from 'react';
import Modal from '../uiElements/Modal';
import CheckIcon from '../uiElements/CheckIcon';
import Button from '../uiElements/Button';
import './uploadedModal.style.css';

class UploadedModal extends Component {
  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.props.updateUploadStatus('default');
  }

  render() {
    return (
      <Modal
        open={this.props.showModal}
        // open={true}
        onClose={this.handleCloseModal}
      >
        <div className='modal-content'>
          <CheckIcon />
          <h3>Données téléchargées</h3>
          <p>Ouvrez l’application DIABNEXT pour voir les données de votre pompe. </p>
          <Button onClick={this.handleCloseModal}>OK</Button>
        </div>
      </Modal>
    )
  }
}

export default UploadedModal;
