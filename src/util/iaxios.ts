import axios, { AxiosError } from 'axios';
import {
  getAuthToken,
  getRefreshToken,
  setAuthToken,
  setRefreshToken,
} from './tokenStore';

export const iaxios = axios.create({
  baseURL: 'http://localhost:3000',
});

// set auth header on each request
iaxios.interceptors.request.use((config) => {
  const nConfig = { ...config };
  nConfig.headers.Authorization = `Bearer ${getAuthToken()}`;
  return nConfig;
});

// refresh token if 401 response
iaxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) return Promise.reject(error);
    if (error.response.status !== 401) return Promise.reject(error);
    if (error.request.responseURL.contains('/auth/refresh')) {
      return Promise.reject(error);
    }
    return axios
      .put('/auth/refresh', null, {
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      })
      .then((res) => {
        setAuthToken(res.data.auth_token);
        setRefreshToken(res.data.refresh_token);
        axios.defaults.headers.common.Authorization = res.data.auth_token;
        const config = { ...error.response?.config };
        config.headers.Authorization = `Bearer ${res.data.auth_token}`;
        return axios(config);
      })
      .catch((err) => {
        // store.dispatch(actLogoutUser());
        return Promise.reject(error);
      });
  }
);
