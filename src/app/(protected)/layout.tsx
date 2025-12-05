import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Topbar } from '@components/common/TopBar/Topbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-w-screen min-h-screen">
      <Toaster position="top-right" />
      <Topbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
