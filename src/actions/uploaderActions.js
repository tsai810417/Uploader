import * as APIUtil from '../util/uploaderApiUtil';

export const UPLOAD_RECORDS = 'UPLOAD_RECORDS';
export const UPDATE_UPLOAD_STATUS = 'UPDATE_UPLOAD_STATUS';
export const REQUEST_LAST_RECORD = 'REQUEST_LAST_RECORD';
export const RECEIVE_LAST_RECORD = 'RECEIVE_LAST_RECORD';

export const uploadRecords = (token, records, productId) => dispatch => {
  dispatch(updateUploadStatus('processing'));

  APIUtil.uploadRecords(token, records)
  .then(response => {
    dispatch(updateUploadStatus('success'))
    dispatch(requestLastRecord(token, productId))
  })
  .catch(error => {
    dispatch(updateUploadStatus('failed'))
  })
};

export const updateUploadStatus = status => {
  return {
    type: UPDATE_UPLOAD_STATUS,
    payload: status
  }
};

export const requestLastRecord = (token, productId) => dispatch => {
  APIUtil.requestLastRecord(token, productId)
  .then(response => {
    dispatch(receiveLastRecord(response.data.record))
  })
  .catch(error => {
    console.log(error);
  })
};

export const receiveLastRecord = record => {
  return {
    type: RECEIVE_LAST_RECORD,
    payload: record
  }
}
