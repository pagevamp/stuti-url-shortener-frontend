'use client';
import { Button } from '@/src/components/common/Button/Button';
import { InputField } from '@/src/components/common/InputField/InputField';
import { useResend } from '@/src/hooks/useResend';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export const ResendEmailComponent = () => {
  const { error, resendFormData, handleChange, handleSubmit } = useResend();
  return (
    <form
      className="flex flex-col my-5 mx-auto w-[85%] gap-3 place-content-center"
      onSubmit={handleSubmit}
    >
      <p className="text-2xl font-extrabold text-shadow-2xs text-shadow-undraw-secondary-100">
        RESEND EMAIL
      </p>

      <InputField
        name="email"
        type="email"
        icon="ic:outline-email"
        placeholder="Enter your email"
        labelName="Email"
        value={resendFormData.email}
        onChange={handleChange}
        error={error?.email}
      />

      <Button type="submit" className="w-fit">
        <span className="flex flex-row items-center gap-1">
          Resend Email Verification{' '}
          <Icon icon="mdi:email-resend" width={16} height={16} />
        </span>
      </Button>

      <p className="flex flex-row items-center gap-1 mx-auto text-gray-200 text-sm my-5">
        Account already Verified?
        <Link
          href="/login"
          className="text-blue-950 flex flex-row items-center gap-1 cursor-pointer"
        >
          Log In <Icon icon="ri:bear-smile-line" />
        </Link>
      </p>
    </form>
  );
};
