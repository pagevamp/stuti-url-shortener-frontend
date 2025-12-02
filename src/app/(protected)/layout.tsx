import React from 'react';
import { Toaster } from 'react-hot-toast';
import '../colors.css';
import { Topbar } from '@/src/components/commom/TopBar/Topbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-w-screen min-h-screen">
      <Toaster position="top-right" />
      <Topbar />
      <div>{children}</div>
    </div>
  );
};

export default layout;
