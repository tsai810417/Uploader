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

const errorTranslate = (error) => {
  const errorDictionary = {
    WRONG_MAIL: 'Email non reconnu',
    EMAIL_ALREADY_USED_FOR_PRO: 'Email déjà utilisé par un patient utilisant  DIABNEXT Pro',
    USER_NOT_FOUND: 'Utilisateur non reconnu',
    WRONG_CODE: 'Le code saisie est erroné'
  }
  if (errorDictionary[error]) {
    return errorDictionary[error];
  } else {
    return error;
  }
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
        newState.email = errorTranslate(action.payload.error);
      } else if (action.payload.errorType === 'code') {
        newState.code = errorTranslate(action.payload.error);
      }

      return newState;
    case CLEAR_SESSION_ERROR:
      return _nullError;
    default:
      return initState;
  }
};

export default sessionErrorReducer;
