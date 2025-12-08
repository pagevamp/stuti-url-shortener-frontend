import axios from 'axios';
import { ResendEmailParams } from './../types/resend-types';

export const resendVerification = (body: ResendEmailParams) => {
  return axios.post(`/auth/resend-verification`, body);
};
