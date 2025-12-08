import React from 'react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="flex flex-col gap-5 py-10 px-20 max-w-[610px] min-w-[400px]">
      {children}
    </article>
  );
};
