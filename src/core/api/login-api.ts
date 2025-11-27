import { UserLoginParams } from '../types/login-types';
import api from '@/src/lib/axios';

export const loginUser = (body: UserLoginParams) => {
  return api.post(`/api/login`, body);
};
