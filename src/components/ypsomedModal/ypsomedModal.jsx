import React, { Component } from 'react';
import Modal from '../uiElements/Modal';
import TextField from '../uiElements/TextField';
import Button from '../uiElements/Button';
import DiabnextYpsomedImg from '../../images/ypsomed_diabnext.png';
import './ypsomedModal.style.css';

class YpsomedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ypsomedAccount: this.props.ypsomedAccount || '',
      password: ''
    };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSwitchYpsomedAccount = this.handleSwitchYpsomedAccount.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleConfirm() {
    this.props.setYpsomedAccount(this.state.ypsomedAccount);
  }

  handleSwitchYpsomedAccount() {
    this.props.resetYpsomedAccount();
  }

  renderInputModal() {
    return (
      <div id='ypsomed-modal-content'>
        <img src={DiabnextYpsomedImg} id='diabnext-ypsomed-img'/>
        <p>Pour connecter votre pompe Ypsopump à DIABNEXT, veuillez remplir les deux champs suivants puis confirmez:</p>
        <TextField
          id='ypsomed-email-input'
          label='Email'
          placeholder='Email de votre compte Ypsomed'
          defaultValue={ this.state.ypsomedAccount }
          onChange={ this.update('ypsomedAccount') }
          variant='outlined'
          color='primary'
        />
        <TextField
          id='ypsomed-password-input'
          label='Password'
          placeholder='Mot de Passe de votre compte Ypsomed'
          defaultValue={ this.state.ypsomedAccount }
          onChange={ this.update('password') }
          variant='outlined'
          type='password'
          color='primary'
        />
        <Button variant='contained' onClick={ this.handleConfirm }>
          Confirmez
        </Button>
      </div>
    )
  }

  renderConfirmModal() {
    return (
      <div id='ypsomed-modal-content'>
        <img src={DiabnextYpsomedImg} id='diabnext-ypsomed-img'/>
        <p>Les informations de votre pompe Ypsopump du compte</p>
        <h3>{`"${this.props.ypsomedAccount}"`}</h3>
        <p>vont être transférées dans votre compte DIABNEXT.</p>
        <div id='ypsomed-modal-button-holder'>
          <Button variant='contained' onClick={ this.handleSwitchYpsomedAccount }>
            Utiliser un autre email
          </Button>
          <Button variant='contained' onClick={ this.props.handleCloseModal }>
            Confirmez
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Modal
        open={ this.props.showModal }
        onClose={ this.props.handleCloseModal }
      >
        {
          this.props.ypsomedAccount === '' ?
          this.renderInputModal() : this.renderConfirmModal()
        }
      </Modal>
    )
  }
}

export default YpsomedModal;
