import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RECEIVE_SESSION_ERROR,
  CLEAR_SESSION_ERROR
} from '../actions/sessionActions';

const _nullError = {
  email: null,
  code: null
}

const sessionErrorReducer = (initState = '', action) => {
  Object.freeze(initState);
  switch (action.type) {
    case RECEIVE_USER:
      return _nullError;
    case RECEIVE_TOKEN:
      return _nullError;
    case RECEIVE_SESSION_ERROR:
      let newState = {
        email: null,
        code: null
      };
      if (action.payload.errorType === 'email') {
        newState.email = action.payload.error
      } else if (action.payload.errorType === 'code') {
        newState.code = action.payload.error
      }

      return newState;
    case CLEAR_SESSION_ERROR:
      return _nullError;
    default:
      return initState;
  }
};

export default sessionErrorReducer;
