import React from 'react';
import '../colors.css';
import { Container } from '@/src/components/common/Container/Container';

const ResendEmailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-w-screen min-h-screen">
      <div className="bg-undraw-primary-100 w-[50%] h-[90%] mx-auto my-20 rounded-3xl shadow-2xl shadow-lime-950 ">
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default ResendEmailLayout;
