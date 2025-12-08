import { ResendEmailParams } from '@/core/types/resend-types';
import { api } from '@/lib/axios';

export const resendVerification = (body: ResendEmailParams) => {
  return api.post(`/auth/resend-verification`, body);
};
