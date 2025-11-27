import api from '@/src/lib/axios';
import { UserRegistrationParams } from '../types/register-types';

export const registerUser = (body: UserRegistrationParams) => {
  return api.post(`/auth/sign-up`, body);
};
