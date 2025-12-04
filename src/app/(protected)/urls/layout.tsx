import React from 'react';

const UrlLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <section className="bg-blue-50 w-fit min-h-screen absolute top-0 overflow-hidden">
        <div>{children}</div>
      </section>
    </div>
  );
};

export default UrlLayout;
