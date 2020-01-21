import React, { Component } from 'react';
import Button from '../uiElements/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '../uiElements/CircularProgress';
import './sessionForm.style.css';
import logo from '../../images/diabnext_logo.png';

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

  emailInput() {
    if (this.props.userId) {
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
      return (
        <TextField
          id='session-email-input'
          label='Email'
          defaultValue={ this.props.email }
          onChange={ this.update('email') }
          variant='outlined'
          color='primary'
        />
      )
    }
  }

  codeInput() {
    if (this.props.errors.code) {
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
      return (
        <TextField
          id='session-code-input'
          label='Code'
          defaultValue={ this.props.code }
          onChange={ this.update('code') }
          variant='outlined'
        />
      )
    }
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
          Next
        </Button>
      )
    } else if (!this.props.userId) {
      return (
        <Button
          variant='contained'
          onClick={ this.requestLoginCode }
        >
          Next
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
        <section>
          <form id='session-form'>
            <img src={ logo } alt='logo' id='diabnext-logo' />
            { this.emailInput() }
            <br />
            { this.props.userId ? this.codeInput() : '' }
            <br/>
            { this.props.loading ? <CircularProgress /> : this.submitButton() }
          </form>
        </section>
      </div>
    )
  }
}

export default SessionForm;
