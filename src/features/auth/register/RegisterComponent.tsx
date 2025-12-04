'use client';
import { InputField } from '../../../components/common/InputField/InputField';
import { Button } from '../../../components/common/Button/Button';
import { Icon } from '@iconify/react';
import { useRegister } from '@/src/hooks/useRegister';
import Link from 'next/link';

export const RegisterComponent = () => {
  const { error, registerFormData, handleChange, handleSubmit } = useRegister();
  return (
    <form
      className="flex flex-col my-5 mx-auto w-[85%] gap-3 place-content-center"
      onSubmit={handleSubmit}
    >
      <p className="text-2xl font-extrabold text-shadow-2xs text-shadow-undraw-secondary-100">
        SIGN UP
      </p>

      <InputField
        name="fullName"
        type="text"
        icon="mdi:rename-outline"
        placeholder="Enter your name"
        labelName="Full Name"
        value={registerFormData.fullName}
        onChange={handleChange}
        error={error?.fullName}
      />

      <InputField
        name="username"
        type="text"
        icon="akar-icons:person"
        placeholder="Enter your username"
        labelName="User Name"
        value={registerFormData.username}
        onChange={handleChange}
        error={error?.username}
      />

      <InputField
        name="email"
        type="email"
        icon="ic:outline-email"
        placeholder="Enter your email"
        labelName="Email"
        value={registerFormData.email}
        onChange={handleChange}
        error={error?.email}
      />
      <InputField
        name="password"
        type="password"
        icon="tdesign:user-password"
        placeholder="Enter  password"
        labelName="Password"
        value={registerFormData.password}
        onChange={handleChange}
        error={error?.password}
      />
      <Button type="submit">
        <span className="flex flex-row items-center gap-1">
          Sign Up <Icon icon="icomoon-free:enter" width={16} height={16} />
        </span>
      </Button>

      <span className="flex flex-row items-center gap-1 mx-auto text-gray-200 text-sm my-5">
        Sign up with your <Icon icon="logos:google" /> account instead
      </span>

      <p className="flex flex-row items-center gap-1 mx-auto text-gray-200 text-sm my-5">
        Have an account already?
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
