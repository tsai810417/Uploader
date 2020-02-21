import * as APIUtil from '../util/ypsomedModalApiUtil';

export const UPDATE_YPSOMED_IS_PENDING = 'UPDATE_YPSOMED_IS_PENDING';
export const RECEIVE_YPSOMED_ACCOUNT = 'RECEIVE_YPSOMED_ACCOUNT';
export const RECEIVE_YPSOMED_ERROR = 'RECEIVE_YPSOMED_ERROR';
export const CLEAR_YPSOMED_ACCOUNT = 'CLEAR_YPSOMED_ACCOUNT';
export const CLEAR_YPSOMED_ERROR = 'CLEAR_YPSOMED_ERROR';

export const updateYpsomedIsPending = isPending => ({
  type: UPDATE_YPSOMED_IS_PENDING,
  payload: isPending
});

export const receiveYpsomedAccount = payload => ({
  type: RECEIVE_YPSOMED_ACCOUNT,
  payload: payload
});

export const receiveYpsomedError = (error, type) => ({
  type: RECEIVE_YPSOMED_ERROR,
  payload: {
    type: type,
    error: error
  }
});

export const clearYpsomedAccount = () => ({
  type: CLEAR_YPSOMED_ACCOUNT
});

export const clearYpsomedError = () => ({
  type: CLEAR_YPSOMED_ERROR
});

export const requestYpsomedAccount = token => dispatch => {
  dispatch(updateYpsomedIsPending(true));

  APIUtil.requestYpsomedAccount(token)
  .then(response => {
    dispatch(receiveYpsomedAccount({
      country: response.data.mylife_country,
      email: response.data.mylife_email,
      lastSync: response.data.mylife_sync
    }));
    dispatch(updateYpsomedIsPending(false));
  })
  .catch(error => {
    dispatch(updateYpsomedIsPending(false));
    dispatch(receiveYpsomedError(error.response.data.error, 'accountError'))
  })
};

export const linkYpsomedAccount = payload => dispatch => {
  dispatch(updateYpsomedIsPending(true));

  APIUtil.linkYpsomedAccount(payload)
  .then(response => {
    dispatch(receiveYpsomedAccount(payload));
    dispatch(updateYpsomedIsPending(false));
  })
  .catch(error => {
    dispatch(updateYpsomedIsPending(false));
    dispatch(receiveYpsomedError(error.response.data.error, 'linkError'))
  })
};

export const unlinkYpsomedAccount = payload => dispatch => {
  dispatch(updateYpsomedIsPending(true));

  APIUtil.unlinkYpsomedAccount(payload)
  .then(response => {
    dispatch(clearYpsomedAccount());
    dispatch(updateYpsomedIsPending(false));
  })
  .catch(error => {
    dispatch(updateYpsomedIsPending(false));
    dispatch(receiveYpsomedError(error.response.data.error, 'unlinkError'))
  })
};
