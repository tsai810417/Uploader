import * as APIUtil from '../util/userInfoApiUtil';
import { logout } from './sessionActions';

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
export const RECEIVE_WRONG_TOKEN = 'RECEIVE_WRONG_TOKEN';

export const requestUserInfo = token => dispatch => {
  APIUtil.requestUserInfo(token)
  .then(response => dispatch(receiveUserInfo(response.data.user)))
  .catch(error => dispatch(receiveWrongToken()))
};

export const receiveWrongToken = () => dispatch => {
  dispatch(logout());
};

export const receiveUserInfo = user => {
  return {
    type: RECEIVE_USER_INFO,
    payload: user
  }
};
