import axios from 'axios';
import appConfig from '../config.js';

export const requestLoginCode = email => (
  axios({
    method: 'post',
    url: `${appConfig.apiUrl}/users/code-gen`,
    data: {
      email: email,
      forceUserExist: true
    }
  })
);

export const loginWithCode = payload => (
  axios({
    method: 'post',
    url: `${appConfig.apiUrl}/users/code-auth`,
    data: {
      email: payload.email,
      code: payload.code,
      app : 'patient_web'
    }
  })
);
