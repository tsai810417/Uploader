import { cloneDeep } from 'lodash';

import {
  RECEIVE_YPSOMED_ACCOUNT,
  RECEIVE_YPSOMED_ERROR,
  CLEAR_YPSOMED_ACCOUNT,
  CLEAR_YPSOMED_ERROR
} from '../actions/ypsomedModalActions';

const _nullError = Object.freeze({
  accountError: null,
  linkError: null,
  unlinkError: null
});

const errorTranslate = error => {
  const errorDictionary = {
    'CANNOT_ADD_USER': 'Incorrect email or password.',
    'CANNOT_UPDATE_USER': 'Something went wrong, please try again.',
    'USER_ALREADY_EXISTS': 'This YPSOMED account is linked to another DIABNEXT account.'
  };
  if (errorDictionary[error]) {
    return errorDictionary[error];
  } else {
    return error;
  }
};

const ypsomedModalErrorReducer = (initState = _nullError, action) => {
  Object.freeze(initState);

  let newState = cloneDeep(initState);

  switch (action.type) {
    case RECEIVE_YPSOMED_ACCOUNT:
      return _nullError;

    case RECEIVE_YPSOMED_ERROR:
      newState[action.payload.type] = errorTranslate(action.payload.error);
      return newState;

    case CLEAR_YPSOMED_ACCOUNT:
      return _nullError;

    case CLEAR_YPSOMED_ERROR:
      return _nullError;

    default:
      return initState;
  }
};

export default ypsomedModalErrorReducer;
