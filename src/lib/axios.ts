import axios from 'axios';
import { getCookie } from './actions';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    if (config.url?.includes('/urls, /url-analytics'))
      try {
        const accessToken = getCookie();
        if (accessToken && config.headers) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      } catch (err) {
        console.error('Invalid token', err);
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
