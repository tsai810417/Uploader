import * as APIUtil from '../util/sessionApiUtil';

export const REQUEST_LOGIN_CODE = 'REQUEST_LOGIN_CODE';
export const LOGIN_WITH_CODE = 'LOGIN_WITH_CODE';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const RECEIVE_SESSION_ERROR = 'RECEIVE_SESSION_ERROR';
export const CLEAR_SESSION_ERROR = 'CLEAR_SESSION_ERROR';
export const UPDATE_SESSION_IS_PENDING = 'UPDATE_SESSION_IS_PENDING';
export const LOGOUT = 'LOGOUT';

export const requestLoginCode = email => dispatch => {
  dispatch(updateSessionIsPending(true));
  APIUtil.requestLoginCode(email)
  .then(response => {
    dispatch(receiveUser({user_id: response.data.id, email: email}));
    dispatch(updateSessionIsPending(false));
  })
  .catch(error => {
    dispatch(receiveSessionError(error.response.data.error, 'email'));
    dispatch(updateSessionIsPending(false));
  })
};

export const loginWithCode = (payload, history) => dispatch => {
  dispatch(updateSessionIsPending(true));
  APIUtil.loginWithCode(payload)
  .then(response => {
    dispatch(receiveToken(response.data));
    dispatch(updateSessionIsPending(false));
    history.push('/dashboard');
  })
  .catch(error => {
    dispatch(receiveSessionError(error.response.data.error, 'code'));
    dispatch(updateSessionIsPending(false));
  })
};

export const receiveUser = payload => {
  return {
    type: RECEIVE_USER,
    payload
  }
};

export const receiveToken = (payload, history) => {
  return {
    type: RECEIVE_TOKEN,
    payload
  }
};

export const receiveSessionError = (error, errorType) => ({
  type: RECEIVE_SESSION_ERROR,
  payload: {
    error: error,
    errorType: errorType
  }
});

export const clearSessionError = () => ({
  type: CLEAR_SESSION_ERROR
});

export const updateSessionIsPending = isPending => ({
  type: UPDATE_SESSION_IS_PENDING,
  payload: isPending
});

export const logout = () => ({
  type: LOGOUT
})
