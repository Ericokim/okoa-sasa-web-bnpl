import axios from 'axios';
import { AUTH_GATEWAY } from './config';

const authApi = axios.create({
  baseURL: AUTH_GATEWAY,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

authApi.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default authApi;