import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Topbar } from '@/src/components/common/TopBar/Topbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <section className="bg-blue-50 w-fit min-h-screen absolute top-0 overflow-hidden">
        <div>{children}</div>
      </section>
    </div>
  );
};

export default layout;
