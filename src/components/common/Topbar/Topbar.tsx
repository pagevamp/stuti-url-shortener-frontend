'use client';
import { Icon } from '@iconify/react';
import { Button } from '../Button/Button';
import { useAuth } from '@/src/hooks/useAuth';

export const Topbar = () => {
  const { handleLogout } = useAuth();
  return (
    <div className="bg-undraw-secondary-100 h-[10vh] max-w-screen text-2xl text-white p-5 place-content-center flex flex-row items-center justify-items-stretch shadow-2xl shadow-gray-400 relative">
      Welcome to SUS.
      <Button
        onClick={handleLogout}
        className="p-0 place-content-end absolute right-5"
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
