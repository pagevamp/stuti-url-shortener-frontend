import api from '@/src/lib/axios';

export const verifyEmail = (token: string) => {
  return api.get(`/auth/verify-email`, { params: token });
};
