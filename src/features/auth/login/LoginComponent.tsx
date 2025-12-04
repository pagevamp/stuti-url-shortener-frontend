'use client';
import { InputField } from '../../../components/common/InputField/InputField';
import { Button } from '../../../components/common/Button/Button';
import { Icon } from '@iconify/react';
import { useAuth } from '@/src/hooks/useAuth';
import Link from 'next/link';

export const LoginComponent = () => {
  const { formData, error, handleChange, handleSubmit } = useAuth();
  return (
    <form
      className="flex flex-col my-5 mx-auto w-[85%] gap-3 place-content-center"
      onSubmit={handleSubmit}
    >
      <p className="text-2xl font-extrabold text-shadow-2xs text-shadow-undraw-secondary-100">
        LOG IN
      </p>
      <InputField
        name="email"
        type="text"
        icon="akar-icons:person"
        placeholder="Enter your email"
        labelName="Email"
        value={formData.email.trim()}
        error={error?.email}
        onChange={handleChange}
      />
      <InputField
        name="password"
        type="password"
        icon="tdesign:user-password"
        placeholder="Enter password"
        labelName="Password"
        value={formData.password.trim()}
        error={error?.password}
        onChange={handleChange}
      />

      <span className="flex flex-row items-center gap-1 mx-auto text-gray-200 text-sm my-5">
        Forgot Password?
      </span>

      <Button type="submit">
        <span className="flex flex-row items-center gap-1">
          Log In <Icon icon="pepicons-print:enter" width={16} height={16} />
        </span>
      </Button>

      <p className="flex flex-row items-center gap-1 mx-auto text-gray-200 text-sm my-5">
        Don&apos;t have an account yet?
        <Link
          href="/register"
          className="text-blue-950 flex flex-row items-center gap-1 cursor-pointer"
        >
          Join us <Icon icon="ri:bear-smile-line" />
        </Link>
      </p>
    </form>
  );
};
