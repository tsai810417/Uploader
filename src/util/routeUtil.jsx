import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect, withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.token)
})

const Auth = ({ component: Component, loggedIn, path }) => (
  <Route
    path = { path }
    render = {
      props => (loggedIn ? <Redirect to='/dashboard' /> : <Component { ...props } />)
    }
  />
);

const Protected = ({ component: Component, loggedIn, path }) => (
  <Route
    path={ path }
    render={
      props => (loggedIn ? <Component { ...props } /> : <Redirect to='/login' />)
    }
  />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
