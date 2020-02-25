import axios from 'axios';
import appConfig from '../config.js';

export const requestYpsomedAccount = token => (
  axios({
    method: 'get',
    url: `${appConfig.apiUrl}/vendor/ypsomed/check_reg`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
);

export const linkYpsomedAccount = payload => (
  axios({
    method: 'post',
    url: `${appConfig.apiUrl}/vendor/ypsomed/patient`,
    headers: {
      Authorization: `Bearer ${payload.token}`
    },
    data: {
    	country: payload.country,
      email: payload.email,
      password: payload.password
    }
  })
);

export const unlinkYpsomedAccount = payload => (
  axios({
    method: 'delete',
    url: `${appConfig.apiUrl}/vendor/ypsomed/patient/${payload.country}/${payload.email}`,
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  })
);
