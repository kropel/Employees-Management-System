import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_URL_SERVER;

export const login = async (username: string, password: string) => {
  try {
    const data = await axios.request({
      url: `${SERVER_URL}/token`,
      method: 'post',

      data: {
        username,
        password,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const setToken = (tokenObj: any) => {
  localStorage.setItem('access_token', tokenObj);
  //   localStorage.setItem("refresh_token", tokenObj.refresh_token);
};
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

export const hasToken = () => !!getAccessToken();

export const clearToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
