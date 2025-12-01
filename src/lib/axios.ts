import axios from 'axios';
import { getCookie } from './actions';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const createApiInstance = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    async (config) => {
      if (
        config.url?.includes('/urls, /url-analytics') &&
        typeof window === 'undefined'
      )
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

  return instance;
};

export const api = createApiInstance(BASE_API_URL);
