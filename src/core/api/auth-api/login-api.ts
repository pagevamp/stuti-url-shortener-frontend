import { UserLoginParams } from '@/core/types/login-types';
import axios from 'axios';

export const loginUser = (body: UserLoginParams) => {
  return axios.post(`/api/login`, body);
};
