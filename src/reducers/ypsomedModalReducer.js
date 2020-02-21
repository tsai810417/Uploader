import { cloneDeep } from 'lodash';

import {
  UPDATE_YPSOMED_IS_PENDING,
  RECEIVE_YPSOMED_ACCOUNT,
  CLEAR_YPSOMED_ACCOUNT
} from '../actions/ypsomedModalActions';

const _nullYpsomedAccount = Object.freeze({
  loading: false,
  country: 'France',
  email: null,
  lastSync: null
});

const ypsomedModalReducer = (initState = _nullYpsomedAccount, action) => {
  Object.freeze(initState);

  let newState = cloneDeep(initState);

  switch (action.type) {
    case UPDATE_YPSOMED_IS_PENDING:
      newState.loading = action.payload;
      return newState;

    case RECEIVE_YPSOMED_ACCOUNT:
      newState.country = action.payload.country;
      newState.email = action.payload.email;
      newState.lastSync = action.payload.lastSync;
      return newState;

    case CLEAR_YPSOMED_ACCOUNT:
      return _nullYpsomedAccount;

    default:
      return initState;
  }
};


export default ypsomedModalReducer;
