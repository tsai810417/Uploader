import { cloneDeep } from 'lodash';
import {
  RECEIVE_USER_INFO
} from '../actions/userInfoActions';

const _nullUserInfo = Object.freeze({
  user: {
    id: null,
    firstname: null,
    lastname: null,
    maiden_name: null,
    email: null,
    url_picture: null,
    diabete_type: null,
    diabete_type_color: null,
    address1: null,
    address2: null,
    zip: null,
    city: null,
    country: null,
    nirpp: null
  },
  loading: false
});

const userInfoReducer = (initState = _nullUserInfo, action) => {
  Object.freeze(initState);
  let newState = cloneDeep(initState);
  switch (action.type) {
    case RECEIVE_USER_INFO:
      newState.user = action.payload;
      return newState;

    default:
      return initState;
  }
};

export default userInfoReducer;
