import { cloneDeep } from "lodash";
import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
  LOGOUT,
  UPDATE_SESSION_IS_PENDING
} from '../actions/sessionActions';

const _nullUser = Object.freeze({
  email: null,
  userId: null,
  token: null,
  loading: false
});

const pastToken = {
  token: localStorage.token
}

const sessionReducer = (initState = pastToken, action) => {
  Object.freeze(initState);
  let newState = cloneDeep(initState);
  switch (action.type) {
    case RECEIVE_USER:
      return {
        userId: action.payload.user_id,
        email: action.payload.email,
        token: null
      };

    case RECEIVE_TOKEN:
      localStorage.token = action.payload.token;
      let userId = initState.userId;
      return {
        userId: userId,
        token: action.payload.token
      };

    case LOGOUT:
      localStorage.token = '';
      return _nullUser;

    case UPDATE_SESSION_IS_PENDING:
      newState.loading = action.payload;
      return newState;

    default:
      return initState;
  }
};

export default sessionReducer;
