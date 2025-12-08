import { api } from '@/lib/axios';
import { UserLoginParams } from '../types/login-types';

export const loginUser = (body: UserLoginParams) => {
  return api.post(`/auth/login`, body);
};
