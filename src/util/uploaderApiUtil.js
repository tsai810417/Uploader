import axios from 'axios';
import appConfig from '../config.js';

export const uploadRecords = (token, records) => {
  const timeZone = appConfig.timeZone;
  let recordsToUpload = records;
  let result;
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
  })

  return axios.all(promiseArray);
  // return axios({
  //   method: 'post',
  //   url: `${appConfig.apiUrl}/records`,
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   },
  //   data: {
  //     records: recordsToUpload.slice(0,299)
  //   }
  // })
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
