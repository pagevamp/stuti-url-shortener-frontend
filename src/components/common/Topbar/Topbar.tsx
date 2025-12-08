'use client';
import { Icon } from '@iconify/react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../Button';

export const TopBar = () => {
  const { handleLogout } = useAuth();
  return (
    <div className="bg-undraw-primary-100 border-b-4 border-undraw-secondary-100 h-[15vh] w-screen p-6 place-content-center flex flex-row items-center justify-items-stretch  text-undraw-secondary-100">
      <span className="font-extrabold text-5xl text-shadow-2xs text-shadow-green-100">
        Welcome to <span className="text-emerald-950">SUS.</span>
      </span>
      <div className="absolute right-10 flex flex-row gap-3 items-center">
        <Button
          variant="handler"
          onClick={handleLogout}
          className="max-w-25 h-10 border-3"
        >
          Log Out <Icon icon="streamline-sharp:logout-2-remix" />
        </Button>
        <Icon
          icon="ix:user-profile-filled"
          className="border-3 border-cyan-800 rounded-full h-10 w-10"
          height={32}
          width={32}
        />
        <Icon
          icon="ix:user-profile-filled"
          className="border-3 border-cyan-800 rounded-full h-10 w-10"
          height={32}
          width={32}
        />
      </div>
    </div>
  );
};
