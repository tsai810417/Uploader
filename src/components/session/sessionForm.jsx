import React, { Component } from 'react';
import Button from '../uiElements/Button';
import TextField from '../uiElements/TextField';
import CircularProgress from '../uiElements/CircularProgress';
import InfoIcon from '../uiElements/InfoIcon';
import './sessionForm.style.css';
import logo from '../../images/diabnext_logo.png';
import Background from '../../images/background.jpg';

class SessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email || '',
      code: ''
    };
    this.requestLoginCode = this.requestLoginCode.bind(this);
    this.loginWithCode = this.loginWithCode.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  renderEmailInput() {
    if (this.props.userId) {
      // disabled email textField
      return (
        <TextField
          disabled
          id='session-email-input'
          label='Email'
          defaultValue={ this.props.email }
          variant='outlined'
          color='primary'
        />
      )
    }
    if (this.props.errors.email) {
      // email textField with error msg
      return (
        <TextField
          error
          id='session-email-input'
          label='Email'
          defaultValue={ this.props.email }
          onChange={ this.props.clearSessionError }
          variant='outlined'
          helperText={ this.props.errors.email }
          color='primary'
        />
      )
    } else {
      // default email textField
      return (
        <TextField
          id='session-email-input'
          label='Email'
          placeholder='Email'
          defaultValue={ this.props.email }
          onChange={ this.update('email') }
          variant='outlined'
          color='primary'
        />
      )
    }
  }

  renderCodeInput() {
    if (this.props.errors.code) {
      // code textField with error msg
      return (
        <TextField
          error
          id='session-code-input'
          label='Code'
          defaultValue={ this.props.code }
          onChange={ this.props.clearSessionError }
          variant='outlined'
          helperText={ this.props.errors.code }
        />
      )
    } else {
      // default code textField
      return (
        <TextField
          id='session-code-input'
          label='Code'
          placeholder='Code à 4 chiffres reçu par mail'
          defaultValue={ this.props.code }
          onChange={ this.update('code') }
          variant='outlined'
        />
      )
    }
  }

  renderCodeInstruction() {
    return (
      <div id='code-instruction-holder'>
        <InfoIcon />
        <div>
        <h3>Code à 4 chiffres reçu par mail</h3>
        <p>Veuillez entrer le code reçu dans votre boîte mail. N’oubliez pas de regarder dans vos SPAMS.</p>
        </div>
      </div>
    )
  }

  requestLoginCode(e) {
    e.preventDefault();
    this.props.requestLoginCode(this.state.email);
  }

  loginWithCode(e) {
    e.preventDefault();
    this.props.loginWithCode(
      { email: this.state.email, code: this.state.code },
      this.props.history
    )
  }

  submitButton() {
    if (!this.state.email) {
      return (
        <Button
          variant='contained'
          onClick={ this.requestLoginCode }
          disabled
        >
          SUIVANT
        </Button>
      )
    } else if (!this.props.userId) {
      return (
        <Button
          variant='contained'
          onClick={ this.requestLoginCode }
        >
          SUIVANT
        </Button>
      )
    } else {
      return (
        <Button
          variant='contained'
          onClick={ this.loginWithCode }
        >
          Login
        </Button>
      )
    }
  }

  render() {
    return (
      <div id='page-container'>
        <section id='backgound-holder' style={{ backgroundImage: `url(${Background})` }}></section>
        <section id='session-form-container'>
          <form id='session-form'>
            <img src={ logo } alt='logo' id='diabnext-logo' />
            { this.renderEmailInput() }
            { this.props.userId ? this.renderCodeInstruction() : '' }
            { this.props.userId ? this.renderCodeInput() : '' }
            { this.props.loading ? <CircularProgress /> : this.submitButton() }
          </form>
        </section>
      </div>
    )
  }
}

export default SessionForm;
