import { UserRegistrationParams } from '@/core/types/register-types';
import { api } from '@/lib/axios';

export const registerUser = (body: UserRegistrationParams) => {
  return api.post(`/auth/sign-up`, body);
};
