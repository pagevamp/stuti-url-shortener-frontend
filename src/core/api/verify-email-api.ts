import axios from 'axios';

export const verifyEmail = (token: string) => {
  return axios.get(`/auth/verify-email`, { params: token });
};
