import {
  SET_YPSOMED_ACCOUNT,
  RESET_YPSOMED_ACCOUNT
} from '../actions/ypsomedModalActions';

const pastYpsomedAccount = localStorage.ypsomedAccount || '';

const ypsomedModalReducer = (initState = pastYpsomedAccount, action) => {
  switch (action.type) {
    case SET_YPSOMED_ACCOUNT:
      localStorage.ypsomedAccount = action.payload;
      return action.payload;

    case RESET_YPSOMED_ACCOUNT:
      return '';

    default:
      return initState;
  }
};


export default ypsomedModalReducer;
