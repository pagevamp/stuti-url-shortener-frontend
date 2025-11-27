'use client';
import { ChangeEvent, useState } from 'react';
import { registerFormValidationSchema } from '../core/validation/register-validation';
import { RegisterErrors } from '../core/types/register-types';
import { registerUser } from '../core/api/register-api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useRegister() {
  const router = useRouter();

  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<RegisterErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = registerFormData;
    const result = registerFormValidationSchema.safeParse(formValues);

    if (!result.success) {
      const formattedErrors: RegisterErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterErrors;
        formattedErrors[field] = issue.message;
      });
      setError(formattedErrors);
      return;
    }
    setError({});

    try {
      await registerUser(formValues);

      setRegisterFormData({
        username: '',
        fullName: '',
        email: '',
        password: '',
      });
      setError({});
      toast.success('Register successful');
      router.push('/resend-email');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Register failed : ${err.message}`);
      } else {
        toast.error('Register failed : An unknown error occurred');
      }
    }
  };

  return {
    error,
    setError,
    registerFormData,
    setRegisterFormData,
    handleChange,
    handleSubmit,
  };
}
