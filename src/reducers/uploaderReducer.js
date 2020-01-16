import { cloneDeep } from 'lodash';
import {
  UPDATE_UPLOAD_STATUS,
  RECEIVE_LAST_RECORD
} from '../actions/uploaderActions';

const _defaultStatus = Object.freeze({
  status: 'default',
  lastRecordTimestamp: null
});

const uploaderReducer = (initState = _defaultStatus, action) => {
  let newState = cloneDeep(initState);
  switch (action.type) {
    case UPDATE_UPLOAD_STATUS:
      newState.status = action.payload;
      return newState;

    case RECEIVE_LAST_RECORD:
      newState.lastRecordTimestamp = action.payload.recorded_at;
      return newState;

    default:
      return initState;
  }
};

export default uploaderReducer;
