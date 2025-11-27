import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/path',
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  console.log('Request sent:', config.url);
  return config;
});

export default apiClient;
