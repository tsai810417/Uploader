import React, { Component } from 'react';
import Modal from '../uiElements/Modal';
import CheckIcon from '../uiElements/CheckIcon';
import ErrorIcon from '../uiElements/ErrorIcon';
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

  renderSuccessModal() {
    return (
      <div className='modal-content'>
        <CheckIcon />
        <h3>Données téléchargées</h3>
        <p>Ouvrez l’application DIABNEXT pour voir les données de votre pompe.</p>
        <Button onClick={ this.handleCloseModal }>OK</Button>
      </div>
    )
  }

  renderFailedModal() {
    return (
      <div className='modal-content'>
        <ErrorIcon />
        <h3>Oops! Le téléchargement a échoué</h3>
        <p>Please refresh the page and try again</p>
        <Button onClick={ this.handleCloseModal }>OK</Button>
      </div>
    )
  }

  render() {
    return (
      <Modal
        open={ this.props.showModal }
        // open={true}
        onClose={ this.handleCloseModal }
      >
        {
          this.props.status === 'success' ?
          this.renderSuccessModal() : this.renderFailedModal()
        }
      </Modal>
    )
  }
}

export default UploadedModal;
