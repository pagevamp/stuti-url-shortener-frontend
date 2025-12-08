import { verifyEmail } from '@/core/api/email-verification-api/verify-email-api';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export function useVerify() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

try {
    verifyEmail(token as string);
  }catch(err){
    if (err instanceof Error) {
      toast.error(`Failed to verify token: ${err.message}`);
    } else {
      toast.error('Failed to verify token: An unknown error occurred');
    }
  }
}
