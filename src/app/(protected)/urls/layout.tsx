import React from 'react';

const UrlLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-white w-full min-h-screen">
      <div>{children}</div>
    </section>
  );
};

export default UrlLayout;
