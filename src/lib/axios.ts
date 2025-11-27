'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('accessToken');

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

api.interceptors.request.use((config) => {
  return config;
});

export default api;

