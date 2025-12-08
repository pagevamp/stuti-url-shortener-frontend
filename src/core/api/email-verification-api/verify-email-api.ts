import { api } from '@/lib/axios';

export const verifyEmail = (token: string) => {
  return api.get(`/auth/verify-email`, { params: { token } });
};
