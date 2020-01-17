import axios from 'axios';
import appConfig from '../config.js';

export const requestUserInfo = token => (
  axios({
    method: 'get',
    url: `${appConfig.apiUrl}/user/profile`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
);
