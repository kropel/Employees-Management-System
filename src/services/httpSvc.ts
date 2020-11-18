import axios from 'axios';

import { clearToken, getAccessToken } from './authSvc';
import history from '../history';

export const http = axios.create();

http.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      clearToken();
      history.push('/');
    }
    return error;
  }
  // , function (error) {
  //   const originalRequest = error.config;

  //   if (error.response.status === 401 && originalRequest.url ===
  // 'http://13.232.130.60:8081/v1/auth/token) {
  //       router.push('/login');
  //       return Promise.reject(error);
  //   }

  //   if (error.response.status === 401 && !originalRequest._retry) {

  //       originalRequest._retry = true;
  //       const refreshToken = localStorageService.getRefreshToken();
  //       return axios.post('/auth/token',
  //           {
  //               "refresh_token": refreshToken
  //           })
  //           .then(res => {
  //               if (res.status === 201) {
  //                   localStorageService.setToken(res.data);
  //                   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
  //                   return axios(originalRequest);
  //               }
  //           })
  //   }
  //   return Promise.reject(error);
  // });
);

export const a: number = 3;
