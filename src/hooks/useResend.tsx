'use client';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ResendErrors } from '@/core/types/resend-types';
import { resendEmailValidationSchema } from '@/core/validation/resend-validation';
import { resendVerification } from '@/core/api/resend-api';

export function useResend() {
  const router = useRouter();

  const [resendFormData, setResendFormData] = useState({
    email: '',
  });

  const [error, setError] = useState<ResendErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setResendFormData((prevResendFormData) => ({
      ...prevResendFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = resendFormData;
    const result = resendEmailValidationSchema.safeParse(formValues);

    if (!result.success) {
      const formattedErrors: ResendErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ResendErrors;
        formattedErrors[field] = issue.message;
      });
      setError(formattedErrors);
      return;
    }
    setError({});

    try {
      await resendVerification(formValues);

      setResendFormData({
        email: '',
      });
      setError({});
      toast.success('Verification Token resent');
      router.push('/login');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Failed to resend token: ${err.message}`);
      } else {
        toast.error('Failed to resend token: An unknown error occurred');
      }
    }
  };

  return {
    error,
    setError,
    resendFormData,
    setResendFormData,
    handleSubmit,
    handleChange,
  };
}
