'use client';
import { useLogin } from '@/src/hooks/useLogin';
import { Icon } from '@iconify/react';
import { Button } from '../Button/Button';

export const Topbar = () => {
  const { handleLogout } = useLogin();
  return (
    <div className="bg-undraw-secondary-100 h-[10vh] max-w-screen text-2xl text-white p-5 place-content-center flex flex-row items-center justify-items-stretch shadow-2xl shadow-gray-400 relative">
      Welcome to SUS.
      <Button
        onClick={handleLogout}
        className="p-1 place-content-end absolute right-5"
      >
        Log Out{' '}
        <Icon
          icon="streamline-sharp:logout-2-remix"
          className="text-white"
          height={24}
          width={24}
        />
      </Button>
    </div>
  );
};
