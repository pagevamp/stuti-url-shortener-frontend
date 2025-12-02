import React from 'react';
import { Toaster } from 'react-hot-toast';
// import '../colors.css';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-blue-50 max-w-screen h-screen mx-0">
      <Toaster position="top-right" />
      {children}
    </div>
  );
};

export default layout;
