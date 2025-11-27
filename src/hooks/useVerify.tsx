import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { verifyEmail } from '@/src/core/api/verify-email-api';

export function useVerify() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    verifyEmail(token as string);

    function redirectLogin() {
      router.push('/login');
    }
    setTimeout(redirectLogin, 6000);
  }, []);

  return <div>useVerify</div>;
}
