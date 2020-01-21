import axios from 'axios';
import appConfig from '../config.js';

export const uploadRecords = (token, records, lastRecordTimestamp) => {
  let recordsToUpload;
  if (lastRecordTimestamp) {
    recordsToUpload = records.filter(record => new Date(record.recorded_at) > new Date(lastRecordTimestamp));
  } else {
    recordsToUpload = records;
  }

  let promiseArray = [];

  while (recordsToUpload.length > 0) {
    promiseArray.push(recordsToUpload.slice(0,299));
    recordsToUpload = recordsToUpload.slice(299, recordsToUpload.length);
  }

  promiseArray = promiseArray.map(el => {
    return axios({
      method: 'post',
      url: `${appConfig.apiUrl}/records`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        records: el
      }
    })
  });
  return axios.all(promiseArray);
};

export const requestLastRecord = (token, productId) => {
  return axios({
    method: 'get',
    url: `${appConfig.apiUrl}/records/last/${productId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
