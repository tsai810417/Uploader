import React, { Component } from 'react';
import moment from "moment-timezone";
import Modal from '../uiElements/Modal';
import CircularProgress from '../uiElements/CircularProgress';
import TextField from '../uiElements/TextField';
import Button from '../uiElements/Button';
import DangerButton from '../uiElements/DangerButton';
import DiabnextYpsomedImg from '../../images/ypsomed_diabnext.png';
import './ypsomedModal.style.css';
import appConfig from '../../config';

const timeZone = appConfig.timeZone

class YpsomedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email || '',
      password: ''
    };
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  componentDidMount() {
    this.props.requestYpsomedAccount(this.props.token);
  }

  handleConnect() {
    this.props.linkYpsomedAccount({
      token: this.props.token,
      country: this.props.country,
      email: this.state.email,
      password: this.state.password
    });
  }

  handleDisconnect() {
    this.setState({
      email: '',
      password: ''
    });
    this.props.unlinkYpsomedAccount({
      token: this.props.token,
      country: this.props.country,
      email: this.props.email
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  renderInpuFields() {
    const errorTextField = type => (
      <TextField
        error
        id={ `ypsomed-${type}-error` }
        label={ type.charAt(0).toUpperCase() + type.slice(1) }
        type={ type }
        difaultValue={ this.state[type] }
        onChange={ this.props.clearYpsomedError }
        variant='outlined'
        color='primary'
      />
    );

    const inputTextField = type => (
      <TextField
        id={ `ypsomed-${type}-input` }
        label={ type.charAt(0).toUpperCase() + type.slice(1) }
        type={ type }
        defaultValue={ this.state[type] }
        onChange={ this.update(type) }
        variant='outlined'
        color='primary'
      />
    );

    const disabledConfirmButton = (
      <Button variant='contained' disabled>
        Confirmez
      </Button>
    );

    const confirmButton = (
        this.props.loading ? <CircularProgress /> :
        <Button variant='contained' onClick={ this.handleConnect }>
          Confirmez
        </Button>
    );

    return (
      <div id='ypsomed-modal-content'>
        <img alt='diabnext-ypsomed-img' src={DiabnextYpsomedImg} id='diabnext-ypsomed-img'/>
        <p>Pour connecter votre pompe Ypsopump à DIABNEXT, veuillez remplir les deux champs suivants puis confirmez:</p>
        { !this.props.errors.linkError ? inputTextField('email') : errorTextField('email') }
        { !this.props.errors.linkError ? inputTextField('password') : errorTextField('password') }
        { this.props.errors.linkError ?
          <p style={{color: 'red', margin: '0px 0px 20px 0px'}}>{ this.props.errors.linkError }</p> : ''
        }
        {
          !this.state.email || !this.state.password || this.props.errors.linkError ?
          disabledConfirmButton : confirmButton
        }
      </div>
    )
  }

  renderInfo() {
    return (
      <div id='ypsomed-modal-content'>
        <img src={DiabnextYpsomedImg} id='diabnext-ypsomed-img'/>
        <p>Les informations de votre pompe Ypsopump du compte</p>
        <h3>{ `"${this.props.email}"` }</h3>
        <p>vont être transférées dans votre compte DIABNEXT.</p>
        <p style={{color: '#9E9E9E'}}>
          {
            this.props.lastSync ?
            'Dernière connexion: ' +
            `${moment(this.props.lastSync).tz(timeZone).format('YYYY/MM/DD HH:mm')}` : ''
          }
        </p>
        {
          this.props.loading ? <CircularProgress /> :
          <div id='ypsomed-modal-button-holder'>
            <DangerButton variant='contained' onClick={ this.handleDisconnect }>
              Déconnecter
            </DangerButton>
            <Button variant='contained' onClick={ this.props.handleCloseModal }>
              OK
            </Button>
          </div>
        }
      </div>
    )
  }

  render() {
    return (
      <Modal
        open={ this.props.showModal }
        onClose={ this.props.handleCloseModal }
      >
        { this.props.email ? this.renderInfo() : this.renderInpuFields() }
      </Modal>
    )
  }
}

export default YpsomedModal;
